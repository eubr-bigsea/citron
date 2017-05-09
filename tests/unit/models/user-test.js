import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: ['model:datasource', 'model:workflow', 'model:job']
});

test('it exists', function(assert) {
  let user = this.subject();
  assert.ok(!!user);
});

test('it should be consistent', function(assert) {
  let user = this.subject({
    firstName: 'Joao',
    lastName: 'Soares',
    email: 'example@ex.com',
    password: '123456',
    passwordConfirmation: '123456',
    authenticationToken: '123abc'
  });

  assert.equal(user.get('firstName'), 'Joao', 'firstName consist');
  assert.equal(user.get('lastName'), 'Soares', 'lastName consist');
  assert.equal(user.get('email'), 'example@ex.com', 'email consist');
  assert.equal(user.get('password'), '123456', 'password consist');
  assert.equal(user.get('passwordConfirmation'), '123456', 'passwordConfirmation consist');
  assert.equal(user.get('authenticationToken'), '123abc', 'authenticationToken consist');
  assert.equal(user.get('name'), 'Joao Soares', 'firstName consist');
});

