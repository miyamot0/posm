QUnit.module('POSM.Compare.objectsByValue');
QUnit.test('compare values', function(assert) {
  var expected = POSM.MORE_THAN;
  var actual = POSM.Compare.objectsByValue({value: 500}, {value: 400}, 'value');
  assert.equal(actual, expected, 'values are correctly compared');
});
QUnit.test('compare ranks', function(assert) {
  var expected = POSM.LESS_THAN;
  var actual = POSM.Compare.objectsByValue({rank: 0}, {rank: 1}, 'rank');
  assert.equal(actual, expected, 'ranks are correctly compared');
});
QUnit.test('compare beliefs', function(assert) {
  var expected = POSM.MORE_THAN;
  var actual = POSM.Compare.objectsByValue({
    belief: 0.5
  }, {
    belief: 0.2
  }, 'belief');
  assert.equal(actual, expected, 'values are correctly compared');
});
QUnit.module('POSM.Compare.settings');
QUnit.test('compare settings with one dimension', function(assert) {
  var setting1 = new POSM.Setting();
  setting1.addDimension('velocity', 600, 1);
  var setting2 = new POSM.Setting();
  setting2.addDimension('velocity', 500, 0);
  var expected = POSM.MORE_THAN;
  var actual = POSM.Compare.settings(setting1, setting2)
  assert.equal(actual, expected, 'settings are correctly compared');
});
QUnit.test('compare settings with two dimensions', function(assert) {
  var setting1 = new POSM.Setting();
  setting1.addDimension('velocity', 250, 0);
  setting1.addDimension('number', 4, 0);
  var setting2 = new POSM.Setting();
  setting2.addDimension('velocity', 500, 1);
  setting2.addDimension('number', 8, 1);
  var expected = POSM.LESS_THAN;
  var actual = POSM.Compare.settings(setting1, setting2)
  assert.equal(actual, expected, 'settings are correctly compared');
});
QUnit.test('compare settings with two dimensions', function(assert) {
  var setting1 = new POSM.Setting();
  setting1.addDimension('velocity', 250, 0);
  setting1.addDimension('number', 4, 0);
  var setting2 = new POSM.Setting();
  setting2.addDimension('velocity', 500, 1);
  setting2.addDimension('number', 8, 1);
  var expected = POSM.MORE_THAN;
  var actual = POSM.Compare.settings(setting2, setting1)
  assert.equal(actual, expected, 'settings are correctly compared');
});
QUnit.test('compare settings with one value equal', function(assert) {
  var setting1 = new POSM.Setting();
  setting1.addDimension('velocity', 250, 0);
  setting1.addDimension('number', 4, 0);
  var setting2 = new POSM.Setting();
  setting2.addDimension('velocity', 250, 0);
  setting2.addDimension('number', 8, 1);
  var expected = POSM.LESS_THAN;
  var actual = POSM.Compare.settings(setting1, setting2)
  assert.equal(actual, expected, 'settings are correctly compared');
});
QUnit.test('compare settings that cannot be compared', function(assert) {
  var setting1 = new POSM.Setting();
  setting1.addDimension('velocity', 250, 0);
  setting1.addDimension('number', 4, 1);
  var setting2 = new POSM.Setting();
  setting2.addDimension('velocity', 500, 1);
  setting2.addDimension('number', 2, 0);
  var expected = false;
  var actual = POSM.Compare.settings(setting2, setting1)
  assert.equal(actual, expected, 'settings are correctly compared');
});
QUnit.test('compare settings with three dimensions', function(assert) {
  var setting1 = new POSM.Setting();
  setting1.addDimension('velocity', 250, 0);
  setting1.addDimension('number', 2, 1);
  setting1.addDimension('strength', 50, 2);
  var setting2 = new POSM.Setting();
  setting2.addDimension('velocity', 500, 1);
  setting2.addDimension('number', 4, 1);
  setting2.addDimension('strength', 100, 2);
  var expected = POSM.LESS_THAN;
  var actual = POSM.Compare.settings(setting1, setting2)
  assert.equal(actual, expected, 'settings are correctly compared');
});
QUnit.test('compare settings with three dimensions', function(assert) {
  var setting1 = new POSM.Setting();
  setting1.addDimension('velocity', 250, 0);
  setting1.addDimension('number', 4, 0);
  setting1.addDimension('strength', 50, 0);
  var setting2 = new POSM.Setting();
  setting2.addDimension('velocity', 500, 1);
  setting2.addDimension('number', 4, 0);
  setting2.addDimension('strength', 100, 1);
  var expected = POSM.MORE_THAN;
  var actual = POSM.Compare.settings(setting2, setting1)
  assert.equal(actual, expected, 'settings are correctly compared');
});
QUnit.test('compare settings with three dimensions, two equal', function(assert) {
  var setting1 = new POSM.Setting();
  setting1.addDimension('velocity', 250,0);
  setting1.addDimension('number', 4, 0);
  setting1.addDimension('strength', 100, 0);
  var setting2 = new POSM.Setting();
  setting2.addDimension('velocity', 500, 1);
  setting2.addDimension('number', 4, 0);
  setting2.addDimension('strength', 100, 0);
  var expected = POSM.MORE_THAN;
  var actual = POSM.Compare.settings(setting2, setting1)
  assert.equal(actual, expected, 'settings are correctly compared');
});
QUnit.test('compare settings with three dimensions that cannot be compared', function(assert) {
  var setting1 = new POSM.Setting();
  setting1.addDimension('velocity', 250, 0);
  setting1.addDimension('number', 4, 0);
  setting1.addDimension('strength', 50, 1);
  var setting2 = new POSM.Setting();
  setting2.addDimension('velocity', 500, 1);
  setting2.addDimension('number', 4, 0);
  setting2.addDimension('strength', 25, 0);
  var expected = false;
  var actual = POSM.Compare.settings(setting2, setting1)
  assert.equal(actual, expected, 'settings are correctly compared');
});
