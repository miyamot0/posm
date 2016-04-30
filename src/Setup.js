var POSM = POSM || {};
POSM.Setup = POSM.Setup || {};
/**
 * Returns an array of settings, specified using the setup object
 * @param  {object} setup     An object which specifies the settings to add
 * @return {[POSM.settings]}  The settings
 */
POSM.Setup.getSettings = function(setup) {
  var sets = setup;
  var counters = [];
  var settings = [];
  for (var i = 0; i < sets.length; i++) {
    counters.push(0);
  }
  do {
    settings.push(POSM.Setup.getNewSetting(counters, sets));
  } while (POSM.Setup.increment(counters, sets))
  return settings;
};
/**
 * Returns a new setting with dimensions added
 * @param  {[number]} counters  An Array of counters used to add the dimnesions
 * @param  {[object]} sets      The setup object
 * @return {POSM.Setting}       The setting
 */
POSM.Setup.getNewSetting = function(counters, sets) {
  var setting = new POSM.Setting();
  for(var i = 0; i < counters.length; i++) {
    setting.addDimension(sets[i].name, sets[i].values[counters[i]], counters[i]);
  }
  return setting;
}
/**
 * Increments the specified counters
 * @param  {[number]} counters  An array of counters
 * @param  {[object]} sets      The setup object
 * @return {boolean}            True if there are more settings to add
 */
POSM.Setup.increment = function(counters, sets) {
  for (var i = counters.length - 1; i >= 0; i--) {
    if (counters[i] < sets[i].values.length - 1) {
      counters[i]++;
      return true;
    } else {
      counters[i] = 0;
    }
  }
  return false;
};
