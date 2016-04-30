var POSM = POSM || {};
/**
 * Creates a setting group
 * @param  {[POSM.Settings]} settings The settings from which to create the group
 * @param  {[number]} indices         The indices of the settings which should be
 *                                    included
 */
POSM.SettingGroup = function(settings, indices) {
  this.settings = [];
  this.indices = indices;
  this.belief = 0;
  this.setSettings(settings);
  this.setBelief();
};
/**
 * Sets this setting group's settings
 * @param  {[POSM.Setting]} settings And array of settings from which this group
 *                                   should be created.
 */
POSM.SettingGroup.prototype.setSettings = function(settings) {
  for (var i = 0; i < this.indices.length; i++) {
    this.settings.push(settings[this.indices[i]]);
  }
};
/**
 * Calculates and sets this setting group's belief
 */
POSM.SettingGroup.prototype.setBelief = function() {
  for (var i = 0; i < this.settings.length; i++) {
    this.belief += this.settings[i].belief;
  }
};
/**
 * Multiplys the beliefs of all settings in this group by the specified factor
 * @param  {number} factor The factor to multiply each setting's belief by
 */
POSM.SettingGroup.prototype.updateBelief = function(factor) {
  for (var i = 0; i < this.settings.length; i++) {
    this.settings[i].updateBelief(factor);
  }
};
