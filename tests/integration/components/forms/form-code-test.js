import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/form-code', 'Integration | Component | forms/form-code', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{forms/form-code}}`);

  assert.equal(this.$().html().trim(), '');
});
