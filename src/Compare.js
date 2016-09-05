var POSM = POSM || {};
POSM.Compare = POSM.Compare || {};
/**
 * Compares two objects on the variable specifed in comparison
 * @param  {object} obj1       The first object to compare
 * @param  {object} obj2       The second object to compare
 * @param  {string} comparison The variable on which to compare the objects
 * @return {number}            The result of the comparison
 */
POSM.Compare.objectsByValue = function(obj1, obj2, comparison) {
  if (obj1[comparison] > obj2[comparison]) {
    return POSM.MORE_THAN;
  } else if (obj1[comparison] < obj2[comparison]) {
    return POSM.LESS_THAN;
  } else {
    return POSM.EQUAL;
  }
};
/**
 * Compares the two settings by comparing the values of their elements
 * @param  {POSM.Setting} setting1 The first setting
 * @param  {POSM.Setting} setting2 The second setting
 * @return {*}                     The result of the comparison
 */
POSM.Compare.settings = function(setting1, setting2) {
  var comparisons = [];
  for (var dimension in setting1.dimensions) {
    comparison = POSM.Compare.objectsByValue(
      setting1.dimensions[dimension], setting2.dimensions[dimension], 'rank');
    if (comparisons.indexOf(comparison) === -1) {
      comparisons.push(comparison);
    }
  }
  switch (comparisons.length) {
    case 1:
      return comparisons[0];
      break;
    case 2:
      var indexOfEqual = comparisons.indexOf(POSM.EQUAL);
      if (indexOfEqual === -1) {
        return false
      } else {
        return comparisons[(indexOfEqual + 1) % 2]
      }
      break;
    case 3:
      return false;
      break;
  }
};
