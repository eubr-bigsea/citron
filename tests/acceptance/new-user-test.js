import { test } from 'qunit';
import moduleForAcceptance from 'lemonade-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | new user');

test('creating a new user', function(assert) {
  visit('/');
  click('a:contains(Sign Up)');

  fillIn('#firstname', 'First');
  fillIn('#lastname', 'Last');
  fillIn('#email', 'Last');
  fillIn('#password', 'foo123');
  fillIn('#password_confirmation', 'foo123');

  click('#agree');
  click('button:contains(Sign up)');

  andThen(function() {
    assert.equal(currentURL(), '/home');
  });
});
