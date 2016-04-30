/**
 * Global namespace
 * @type {object}
 */
var POSM = POSM || {};
/**
 * The default larning rate
 * @type {number}
 */
POSM.DEFAULT_LEARNING_RATE = 0.25;
/**
 * Constant
 * @type {number}
 */
POSM.MORE_THAN = 1;
/**
 * Constant
 * @type {number}
 */
POSM.LESS_THAN = -1;
/**
 * Constant
 * @type {number}
 */
POSM.EQUAL = 0;
/**
 * Constant
 * @type {number}
 */
POSM.TOO_EASY = 1;
/**
 * Constant
 * @type {number}
 */
POSM.TOO_HARD = -1;
/**
 * Constant
 * @type {number}
 */
POSM.CORRECT = 0;
/**
 * Creates a Posm
 * @param  {number} learningRate  This Posm's learning rate (1 > learningRate > 0)
 * @param {[object]} setup        A setup array
 */
POSM.Posm = function(learningRate, setup) {
  /**
   * This posm's learning rate
   * @type {number}
   */
  this.learningRate;
  /**
   * This posm's difficulty settings
   * @type {[POSM.Setting]}
   */
  this.settings = [];
  /**
   * The index of this posm's current predicted difficulty setting
   * @type {number}
   */
  this.prediction;
  /**
  * For each setting, stores the SettingsGroup containing all settings that are
  * more difficult than it, or equally difficult
   * @type {[POSM.SettingsGroup]}
   */
  this.moreDifficult = [];
  /**
   * For each setting, stores the SettingsGroup containing all settings that are
   * less difficult than it, or equally difficult
   * @type {[POSM.SettingsGroup]}
   */
  this.lessDifficult = [];
  // validate the learning rate
  if (1 <= learningRate || learningRate <= 0) {
    throw new Error('illegal learning rate')
  } else {
    this.learningRate = learningRate || POSM.DEFAULT_LEARNING_RATE;
  }
  // Set settings
  if (setup) {
    this.setSettings(setup);
  }
  // Set initial prediction
  this.predict();
}
/**
 * Predicts an appropriate difficulty Setting
 */
POSM.Posm.prototype.predict = function() {
  this.moreDifficult = POSM.Get.settingGroups(this.settings, POSM.MORE_THAN);
  this.lessDifficult = POSM.Get.settingGroups(this.settings, POSM.LESS_THAN);
  var worstCase = POSM.Get.worstCase(this.moreDifficult, this.lessDifficult);
  this.prediction = POSM.Get.randomFromArray(POSM.Get.bestCase(worstCase, true));
}
/**
 * Updates this posm's beliefs based on the observation
 * @param  {number} observation The observation
 */
POSM.Posm.prototype.update = function(observation) {
  switch(observation) {
    case POSM.TOO_HARD:
        this.moreDifficult[this.prediction].updateBelief(this.learningRate);
        break;
    case POSM.TOO_EASY:
        this.lessDifficult[this.prediction].updateBelief(this.learningRate);
        break;
    default:
  }
};
/**
 * Sets this posm's settings
 * @param  {[object]} setup The setup array
 */
POSM.Posm.prototype.setSettings = function(setup) {
  if (setup) {
    this.settings = POSM.Setup.getSettings(setup);
  }
};
/**
 * Returns the current predicted setting
 * @return {POSM.Setting} The currently predicted setting
 */
POSM.Posm.prototype.getSetting = function() {
  return this.settings[this.prediction];
};
