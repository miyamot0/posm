QUnit.module('POSM.Setup.getSettings', {
  beforeEach: function() {
    this.setupTestObject = [{
      name: 'velocity',
      values: [100, 200, 300, 400, 500, 600]
    }, {
      name: 'number',
      values: [2, 4, 6, 8, 10]
    }, {
      name: 'strength',
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }, {
      name: 'uniformity',
      values: [1, 0.8, 0.6, 0.5]
    }]
    this.expected = []
    for (var i = 0; i < this.setupTestObject[0].values.length; i++) {
      for (var j = 0; j < this.setupTestObject[1].values.length; j++) {
        for (var k = 0; k < this.setupTestObject[2].values.length; k++) {
          for (var l = 0; l < this.setupTestObject[3].values.length; l++) {
            var setting = new POSM.Setting();
            setting.addDimension('velocity', this.setupTestObject[0].values[i], i);
            setting.addDimension('number', this.setupTestObject[1].values[j], j);
            setting.addDimension('strength', this.setupTestObject[2].values[k], k);
            setting.addDimension('uniformity', this.setupTestObject[3].values[l], l);
            this.expected.push(setting);
          }
        }
      }
    }
    for (var m = 0; m < this.expected.length; m++) {
      var s = this.expected[m];
      for (var dimension in s.dimensions) {
        //console.log(dimension + ': ' + s.dimensions[dimension].value + ' | rank: ' + s.dimensions[dimension].rank);
      }
    }
    //console.log(this.expected.length)
  }
});
QUnit.test('add settings with all values specified', function(assert) {
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
    name: 'uniformity',
    values: [1, 0.8, 0.6, 0.5]
  }]
  var actual = POSM.Setup.getSettings(setup);
  assert.deepEqual(actual, this.expected, 'correct settings returned');
});
