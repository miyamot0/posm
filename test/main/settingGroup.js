QUnit.module('POSM.SettingGroup');
QUnit.test('create a setting group', function(assert) {
  var s0 = new POSM.Setting();
  var s1 = new POSM.Setting();
  var s2 = new POSM.Setting();
  var s3 = new POSM.Setting();
  var settings = [s0, s1, s2, s3];
  var indices = [2, 3];
  var settingGroup = new POSM.SettingGroup(settings, indices);
  assert.equal(settingGroup.belief, 2, 'total belief correctly calculated');
  assert.deepEqual(settingGroup.indices, indices, 'indices correctly set');
  assert.deepEqual(settingGroup.settings, [s2, s3], 'settings correctly set');
});
QUnit.module('POSM.SettingGroup.updateBelief');
QUnit.test('updating belief', function(assert) {
  var s0 = new POSM.Setting(0.6);
  var s1 = new POSM.Setting(0.7);
  var s2 = new POSM.Setting(0.4);
  var s3 = new POSM.Setting(0.5);
  var settings = [s0, s1, s2, s3];
  var indices = [0, 1, 2, 3];
  var settingGroup = new POSM.SettingGroup(settings, indices);
  settingGroup.updateBelief(0.5);
  var expected = [0.3, 0.35, 0.2, 0.25];
  for (var i = 0; i < settingGroup.settings.length; i++) {
    assert.equal(settingGroup.settings[i].belief, expected[i], 'belief correctly updated');
  }
});
