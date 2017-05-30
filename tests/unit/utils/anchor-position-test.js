import anchorPosition from 'lemonade-ember/utils/anchor-position';
import { module, test } from 'qunit';

module('Unit | Utility | Anchor Position');

function isEqual(ary1, ary2) {
  return ary1.length == ary2.length &&
    ary1.every((v,i)=> v === ary2[i]);
}

test('it generates correct anchors', function(assert) {
  let result;

  result = anchorPosition(true, 1, 0);
  assert.ok(isEqual(result, [0.5, 0, 0, -1]));

  result = anchorPosition(true, 2, 0);
  assert.ok(isEqual(result, [0.2, 0, 0, -1]));

  result = anchorPosition(true, 2, 1);
  assert.ok(isEqual(result, [0.8, 0, 0, -1]));

  result = anchorPosition(true, 3, 0);
  assert.ok(isEqual(result, [0.2, 0, 0, -1]));

  result = anchorPosition(true, 3, 1);
  assert.ok(isEqual(result, [0.5, 0, 0, -1]));

  result = anchorPosition(true, 3, 2);
  assert.ok(isEqual(result, [0.8, 0, 0, -1]));

  result = anchorPosition(false, 1, 0);
  assert.ok(isEqual(result, [0.5, 1, 0, 1]));

  result = anchorPosition(false, 2, 0);
  assert.ok(isEqual(result, [0.2, 1, 0, 1]));

  result = anchorPosition(false, 2, 1);
  assert.ok(isEqual(result, [0.8, 1, 0, 1]));

  result = anchorPosition(false, 3, 0);
  assert.ok(isEqual(result, [0.2, 1, 0, 1]));

  result = anchorPosition(false, 3, 1);
  assert.ok(isEqual(result, [0.5, 1, 0, 1]));

  result = anchorPosition(false, 3, 2);
  assert.ok(isEqual(result, [0.8, 1, 0, 1]));
});
