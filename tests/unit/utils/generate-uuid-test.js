import generateUUID from 'lemonade-ember/utils/generate-uuid';
import { module, test } from 'qunit';

module('Unit | Utility | generateUUID');

test('it generates', function(assert) {
  let result = generateUUID();

  assert.ok(result[8] === '-');
  assert.ok(result[13] === '-');
  assert.ok(result[14] === '4');
  assert.ok(result[18] === '-');
  assert.ok(result[23] === '-');
});
