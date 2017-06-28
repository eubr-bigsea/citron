import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('datasources/datasource-share', 'Integration | Component | datasources/datasource share', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{datasources/datasource-share}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#datasources/datasource-share}}
      template block text
    {{/datasources/datasource-share}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
