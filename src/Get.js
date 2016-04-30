var POSM = POSM || {};
POSM.Get = POSM.Get || {};
/**
 * Returns the indices at which the settings stand in the relation to the
 * specified setting. E.g. returns the indices where setting is POSM.MORE_THAN
 * settings
 * @param  {POSM.setting} setting     The setting to compare with the others
 * @param  {number} relation          The relation (POSM.MORE_THAN, POSM.LESS_THAN,
 *                                    POSM.EQUAL)
 * @param  {[POSM.setting]} settings  The settings to compare with the setting
 * @return {[number]}                 The indices of the settings that stand in
 *                                    the relation with the setting
 */
POSM.Get.indicesWhere = function(setting, relation, settings) {
  var indices = [];
  for (var i = 0; i < settings.length; i++) {
    if (POSM.Compare.settings(setting, settings[i]) === relation) {
      indices.push(i);
    }
  }
  return indices;
};
/**
 * Returns an array of SettingGroup, where each element in the array is the group
 * of settings that stand in the specified relation to the corresponding element
 * in the original array.
 * @param  {[POSM.Setting]} settings  The settings
 * @param  {number} relation          The relation (POSM.MORE_THAN, POSM.LESS_THAN,
 *                                    POSM.EQUAL)
 * @return {[POSM.SettingGroup]}      The groups of corresponding settings
 */
POSM.Get.settingGroups = function(settings, relation) {
  var result = [];
  for (var i = 0; i < settings.length; i++) {
    var indices = [];
    var setting = settings[i];
    indices = indices.concat(POSM.Get.indicesWhere(setting, relation, settings));
    indices = indices.concat(POSM.Get.indicesWhere(setting, POSM.EQUAL, settings));
    result.push(new POSM.SettingGroup(settings, indices));
  }
  return result;
};
/**
 * Compares the two arrays of settings by comparing the beliefs of corresponding
 * elements, returning an array containing the element with the minimum belief
 * from each pair comparison
 * @param  {[POSM.Setting]} settings1   The first array of settings
 * @param  {[POSM.Setting]} settings2   The second array of settings
 * @return {[POSM.Settings]}            The resulting array of settings
 */
POSM.Get.worstCase = function(settings1, settings2) {
  var result = [];
  for (var i = 0; i < settings1.length; i++) {
    var relation = POSM.Compare.objectsByValue(settings1[i], settings2[i], 'belief');
    switch(relation) {
      case POSM.LESS_THAN:
          result.push(settings1[i]);
          break;
      case POSM.MORE_THAN:
          result.push(settings2[i]);
          break;
      default:
          result.push(POSM.Get.randomFromArray([settings1, settings2])[i]);
      }
  }
  return result;
};
/**
 * Returns an array of POSM.Setting or POSM.SettingGroup containing the elements
 * which have the maximum belief from the specified array
 * @param  {[POSM.Setting]} settings  The array of settings
 * @param  {boolean}  indicesOnly     Return only the indices of the groups
 * @return {[POSM.Setting]}           All elements of the array that have the
 *                                    the maximum belief
 */
POSM.Get.bestCase = function(settings, indicesOnly) {
  var candidates = [settings[0]];
  var indices = [];
  indices.push(0);
  for (var i = 1; i < settings.length; i++) {
    var relation = POSM.Compare.objectsByValue(candidates[0], settings[i], 'belief');
    switch(relation) {
      case POSM.EQUAL:
          candidates.push(settings[i]);
          indices.push(i);
          break;
      case POSM.LESS_THAN:
          candidates = [settings[i]];
          indices = [i];
          break;
      default:

      }
  }
  if (indicesOnly) {
    return indices;
  }
  return candidates;
};
/**
 * Returns a random item from the specified array
 * @param  {[*]} array  The array
 * @return {*}          The randomly selected item
 */
POSM.Get.randomFromArray = function(array) {
  return array[Math.floor(Math.random() * array.length)];
};
