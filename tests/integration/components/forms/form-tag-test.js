import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/form-tag', 'Integration | Component | forms/form tag', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forms/form-tag}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#forms/form-tag}}
      template block text
    {{/forms/form-tag}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
