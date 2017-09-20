import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('datasources/select2-input', 'Integration | Component | datasources/select2 input', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{datasources/select2-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#datasources/select2-input}}
      template block text
    {{/datasources/select2-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
