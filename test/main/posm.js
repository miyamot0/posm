QUnit.module('POSM.Posm');
QUnit.test('no arguments', function(assert) {
  var posm = new POSM.Posm();
  assert.ok(posm instanceof POSM.Posm, 'object is of corect type');
});
QUnit.test('valid learning rate', function(assert) {
  var posm = new POSM.Posm(0.6);
  assert.ok(posm instanceof POSM.Posm, 'object is of correct type');
  assert.equal(posm.learningRate, 0.6, 'learning rate set correctly');
});
QUnit.test('invalid learning rate', function(assert) {
  assert.throws(function() {
    var posm = new POSM.Posm(0);
  }, 'exception thrown');
  assert.throws(function() {
    var posm = new POSM.Posm(1);
  }, 'exception thrown');
  assert.throws(function() {
    var posm = new POSM.Posm(1.8);
  }, 'exception thrown')
});
QUnit.test('setup array', function(assert) {
  var setup = [{
    name: 'velocity',
    values: [100, 200, 300, 400, 500, 600]
  }, {
    name: 'number',
    values: [2, 4, 6, 8, 10]
  }, {
    name: 'strength',
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }, {
    name: 'duration',
    values: [20, 30, 40, 50]
  }]
  var posm = new POSM.Posm(0.6, setup);
  assert.ok(posm instanceof POSM.Posm, 'object is of correct type');
  assert.equal(posm.settings.length, 6 * 5 * 9 * 4, 'correct number of settings');
});
QUnit.module('POSM.Posm.predict', {
  beforeEach: function() {
    // first posm
    this.posm1 = new POSM.Posm(0.5);
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
    this.posm1.settings = [this.s0, this.s1, this.s2, this.s3];
    // second posm
    this.posm2 = new POSM.Posm(0.225);
    this.r0 = new POSM.Setting();
    this.r0.addDimension('strength', 40, 1);
    this.r0.belief = 0.7;
    this.r1 = new POSM.Setting();
    this.r1.addDimension('strength', 75, 3);
    this.r1.belief = 0.4;
    this.r2 = new POSM.Setting();
    this.r2.addDimension('strength', 12, 0);
    this.r2.belief = 0.2;
    this.r3 = new POSM.Setting();
    this.r3.addDimension('strength', 62, 2);
    this.r3.belief = 0.8;
    this.posm2.settings = [this.r0, this.r1, this.r2, this.r3];
  }
});
QUnit.test('predict', function(assert) {
  var expected = [0, 1, 2];
  this.posm1.predict();
  var actual = this.posm1.prediction;
  assert.ok(expected.indexOf(actual) >= 0, 'Correct index returned');
});
QUnit.test('predict', function(assert) {
  var expected = 3;
  this.posm2.predict();
  var actual = this.posm2.prediction;
  assert.equal(actual, expected, 'Correct index returned');
});
QUnit.module('POSM.Posm.update', {
  beforeEach: function() {
    // first posm
    this.posm1 = new POSM.Posm(0.5);
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
    this.posm1.settings = [this.s0, this.s1, this.s2, this.s3];
    // second posm
    this.posm2 = new POSM.Posm(0.225);
    this.r0 = new POSM.Setting();
    this.r0.addDimension('strength', 40, 1);
    this.r0.belief = 0.7;
    this.r1 = new POSM.Setting();
    this.r1.addDimension('strength', 75, 3);
    this.r1.belief = 0.4;
    this.r2 = new POSM.Setting();
    this.r2.addDimension('strength', 12, 0);
    this.r2.belief = 0.2;
    this.r3 = new POSM.Setting();
    this.r3.addDimension('strength', 62, 2);
    this.r3.belief = 0.8;
    this.posm2.settings = [this.r0, this.r1, this.r2, this.r3];
  }
});
QUnit.test('update', function(assert) {
  this.posm2.predict();
  this.posm2.update(POSM.TOO_EASY);
  var expected = [0.7, 0.4 * 0.225, 0.2, 0.8 * 0.225];
  for (var i = 0; i < this.posm2.settings.length; i++) {
    var actual = this.posm2.settings[i].belief;
    assert.equal(actual, expected[i], 'Belief correctly updated');
  }
});
QUnit.module('POSM.Posm.getSetting', {
  beforeEach: function() {
    // second posm
    this.posm2 = new POSM.Posm(0.225);
    this.r0 = new POSM.Setting();
    this.r0.addDimension('strength', 40, 1);
    this.r0.belief = 0.7;
    this.r1 = new POSM.Setting();
    this.r1.addDimension('strength', 75, 3);
    this.r1.belief = 0.4;
    this.r2 = new POSM.Setting();
    this.r2.addDimension('strength', 12, 0);
    this.r2.belief = 0.2;
    this.r3 = new POSM.Setting();
    this.r3.addDimension('strength', 62, 2);
    this.r3.belief = 0.8;
    this.posm2.settings = [this.r0, this.r1, this.r2, this.r3];
  }
});
QUnit.test('get currently predicted setting', function(assert) {
  this.posm2.predict();
  var expected = this.r3;
  var actual = this.posm2.getSetting();
  assert.deepEqual(actual, expected, 'Correct setting returned');
});
QUnit.module('POSM.Posm usage');
QUnit.test('use in production', function(assert) {
  var setup = [{
    name: 'targets',
    values: [2, 4, 6]
  }, {
    name: 'distractors',
    values: [2, 4, 6]
  }, {
    name: 'uniformity',
    values: [1, 0.75, 0.5]
  }];
  var posm3 = new POSM.Posm(0.25, setup);
  posm3.predict();
  var original = posm3.prediction;
  posm3.update(POSM.TOO_EASY);
  posm3.predict();
  var actual = posm3.prediction;
  assert.notEqual(actual, original);
});
