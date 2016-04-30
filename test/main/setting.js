QUnit.module('POSM.Setting');
QUnit.test('create a setting', function(assert) {
  var setting = new POSM.Setting();
  assert.equal(setting.belief, 1, 'belief set to 1');
  assert.ok(setting.dimensions, 'dimensions object exists');
});
QUnit.test('create a setting', function(assert) {
  var setting = new POSM.Setting(0.225);
  assert.equal(setting.belief, 0.225, 'belief set to specified value');
  assert.ok(setting.dimensions, 'dimensions object exists');
});
QUnit.module('POSM.Setting.addDimension');
QUnit.test('add a dimension', function(assert) {
  var setting = new POSM.Setting();
  setting.addDimension('velocity', 250);
  assert.equal(setting.dimensions.velocity.value, 250, 'dimension added');
  setting.addDimension('health', 100);
  assert.equal(setting.dimensions.health.value, 100, 'dimension added');
});
QUnit.module('POSM.Setting.updateBelief');
QUnit.test('updated setting belief', function(assert) {
  var setting = new POSM.Setting();
  setting.updateBelief(0.4);
  assert.equal(setting.belief, 0.4, 'belief correctly updated');
  setting.updateBelief(0.9);
  assert.equal(setting.belief, 0.4 * 0.9, 'belief correctly updated');
});
