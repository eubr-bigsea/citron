import { moduleForModel, test } from 'ember-qunit';

moduleForModel('token', 'Unit | Model | token', {
  needs: []
});

test('it exists', function(assert) {
  const token = this.subject({email: 'example@ex.com', authenticity_token: '123abc'});
  assert.equal(token.get('email'), 'example@ex.com', 'email cosistent');
  assert.equal(token.get('authenticity_token'), '123abc', 'authenticity_token cosistent');
  assert.ok(!!token);
});
