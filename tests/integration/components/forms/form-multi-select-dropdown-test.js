import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-multi-select-dropdown', 'Integration | Component | form multi select dropdown', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{form-multi-select-dropdown}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#form-multi-select-dropdown}}
      template block text
    {{/form-multi-select-dropdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
