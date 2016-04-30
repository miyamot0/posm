QUnit.module('POSM.Get.indicesWhere', {
  beforeEach: function() {
    this.s0 = new POSM.Setting();
    this.s0.addDimension('velocity', 100, 0);
    this.s1 = new POSM.Setting();
    this.s1.addDimension('velocity', 100, 0);
    this.s2 = new POSM.Setting();
    this.s2.addDimension('velocity', 200, 1);
    this.s3 = new POSM.Setting();
    this.s3.addDimension('velocity', 300, 2);
    this.settings = [this.s0, this.s1, this.s2, this.s3];
  }
});
QUnit.test('get indices where setting is easier', function(assert) {
  var actual = POSM.Get.indicesWhere(this.s1, POSM.LESS_THAN, this.settings);
  var expected = [2, 3];
  assert.deepEqual(actual, expected, 'correct indices returned');
});
QUnit.test('get indices where setting is harder', function(assert) {
  var actual = POSM.Get.indicesWhere(this.s1, POSM.MORE_THAN, this.settings);
  var expected = [];
  assert.deepEqual(actual, expected, 'correct indices returned');
});
QUnit.test('get indices where setting is equal', function(assert) {
  var actual = POSM.Get.indicesWhere(this.s1, POSM.EQUAL, this.settings);
  var expected = [0, 1];
  assert.deepEqual(actual, expected, 'correct indices returned');
});
QUnit.module('POSM.Get.settingGroups', {
  beforeEach: function() {
    this.s0 = new POSM.Setting();
    this.s0.addDimension('velocity', 100, 0);
    this.s1 = new POSM.Setting();
    this.s1.addDimension('velocity', 100, 0);
    this.s2 = new POSM.Setting();
    this.s2.addDimension('velocity', 200, 1);
    this.s3 = new POSM.Setting();
    this.s3.addDimension('velocity', 300, 2);
    this.settings = [this.s0, this.s1, this.s2, this.s3];
  }
});
QUnit.test('get setting groups harder than', function(assert) {
  var expected = [ // B(k)
    new POSM.SettingGroup(this.settings, [2, 3, 0, 1]),
    new POSM.SettingGroup(this.settings, [2, 3, 0, 1]),
    new POSM.SettingGroup(this.settings, [3, 2]),
    new POSM.SettingGroup(this.settings, [3])
  ]
  var actual = POSM.Get.settingGroups(this.settings, POSM.LESS_THAN);
  assert.deepEqual(actual, expected, 'correct setting groups returned');
});
QUnit.test('get setting groups easier than', function(assert) {
  var expected = [ // A(k)
    new POSM.SettingGroup(this.settings, [0, 1]),
    new POSM.SettingGroup(this.settings, [0, 1]),
    new POSM.SettingGroup(this.settings, [0, 1, 2]),
    new POSM.SettingGroup(this.settings, [0, 1, 2, 3])
  ]
  var actual = POSM.Get.settingGroups(this.settings, POSM.MORE_THAN);
  assert.deepEqual(actual, expected, 'correct setting groups returned');
});
QUnit.module('POSM.Get.worstCase', {
  beforeEach: function() {
    this.s0 = new POSM.Setting();
    this.s0.addDimension('velocity', 100, 0);
    this.s0.belief = 0.3;
    this.s1 = new POSM.Setting();
    this.s1.addDimension('velocity', 100, 0);
    this.s1.belief = 0.5;
    this.s2 = new POSM.Setting();
    this.s2.addDimension('velocity', 200, 1);
    this.s2.belief = 0.6;
    this.s3 = new POSM.Setting();
    this.s3.addDimension('velocity', 300, 2);
    this.s3.belief = 0.2;
    this.settings = [this.s0, this.s1, this.s2, this.s3];
    this.ak = POSM.Get.settingGroups(this.settings, POSM.MORE_THAN); // [0, 1], [0, 1], [0, 1, 2], [0, 1, 2, 3]
    this.bk = POSM.Get.settingGroups(this.settings, POSM.LESS_THAN);    // [0, 1, 2, 3], [0, 1, 2, 3], [2, 3], [3]
  }
});
QUnit.test('get worst case settings groups', function(assert) {
  var actual = POSM.Get.worstCase(this.ak, this.bk);
  var expected = [
    this.ak[0],
    this.ak[1],
    this.bk[2],
    this.bk[3]
  ]
  assert.deepEqual(actual, expected, 'correct worst case returned');
});
QUnit.test('get worst case settings groups', function(assert) {
  var actual = POSM.Get.worstCase(this.ak, this.bk);
  var expected = [
    this.ak[0],
    this.ak[1],
    this.bk[2],
    this.bk[3]
  ]
  assert.deepEqual(actual, expected, 'correct worst case returned');
});
QUnit.module('POSM.Get.bestCase', {
  beforeEach: function() {
    this.s0 = new POSM.Setting();
    this.s0.addDimension('velocity', 100, 0);
    this.s0.belief = 0.3;
    this.s1 = new POSM.Setting();
    this.s1.addDimension('velocity', 100, 0);
    this.s1.belief = 0.5;
    this.s2 = new POSM.Setting();
    this.s2.addDimension('velocity', 200, 1);
    this.s2.belief = 0.6;
    this.s3 = new POSM.Setting();
    this.s3.addDimension('velocity', 300, 2);
    this.s3.belief = 0.2;
    this.settings = [this.s0, this.s1, this.s2, this.s3];
    this.ak = POSM.Get.settingGroups(this.settings, POSM.MORE_THAN); // [0, 1], [0, 1], [0, 1, 2], [0, 1, 2, 3]
    this.bk = POSM.Get.settingGroups(this.settings, POSM.LESS_THAN);    // [0, 1, 2, 3], [0, 1, 2, 3], [2, 3], [3]
    this.worstCase = POSM.Get.worstCase(this.ak, this.bk);         // [this.ak[0], this.ak[1], this.bk[2], this.bk[3]]
  }
});
QUnit.test('get best case settings', function(assert) {
  var expected = [this.ak[0], this.ak[1], this.bk[2]];
  var actual = POSM.Get.bestCase(this.worstCase);
  assert.deepEqual(actual, expected, 'correct candidates returned');
});
QUnit.test('get best case settings, indices only', function(assert) {
  var expected = [0, 1, 2];
  var actual = POSM.Get.bestCase(this.worstCase, true);
  assert.deepEqual(actual, expected, 'Correct indices returned');
});
QUnit.module('POSM.Get.randomFromArray');
QUnit.test('get a random item from an array', function(assert) {
  var array = [1,4,5,6,3,54,6,78,9,9,78,57,78,8,9,0,97,4,3,2,54,6,7,8];
  for (var i = 0; i < 100; i++) {
    var el = POSM.Get.randomFromArray(array);
    assert.ok(array.indexOf(el) >= 0, 'returned an element of the array');
  }
});
