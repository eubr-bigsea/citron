import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow/form-edit', 'Integration | Component | workflow/form edit', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{workflow/form-edit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#workflow/form-edit}}
      template block text
    {{/workflow/form-edit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
