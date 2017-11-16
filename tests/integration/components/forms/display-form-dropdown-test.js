import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/display-form-dropdown', 'Integration | Component | forms/display form dropdown', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forms/display-form-dropdown}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#forms/display-form-dropdown}}
      template block text
    {{/forms/display-form-dropdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
