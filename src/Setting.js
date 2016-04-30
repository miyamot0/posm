var POSM = POSM || {};
/**
 * Constructor
 */
POSM.Setting = function(belief) {
  /**
   * The dimensions along which this setting varies
   * @type {object}
   */
  this.dimensions = {};
  /**
   * The current belief that this setting it just right
   * @type {number}
   */
  this.belief = belief || 1;
};
/**
 * Adds a new dimension to this setting
 * @param  {string} name  the name of the dimension to add
 * @param  {number} value the value of the new dimension at this setting
 * @param  {number} rank  the rank of the new dimension of the setting
 */
POSM.Setting.prototype.addDimension = function(name, value, rank) {
  this.dimensions[name] = {
    value: value,
    rank: rank
  };
};
/**
 * Updates this setting's belief by multiplying it by the factor
 * @param  {number} factor The factor to update using
 */
POSM.Setting.prototype.updateBelief = function(factor) {
  this.belief *= factor;
};
