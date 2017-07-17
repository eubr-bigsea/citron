
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('helper-check-cards', 'helper:helper-check-cards', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{helper-check-cards inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

