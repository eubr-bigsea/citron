import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('datasources/upload-progressbar', 'Integration | Component | datasources/upload progressbar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{datasources/upload-progressbar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#datasources/upload-progressbar}}
      template block text
    {{/datasources/upload-progressbar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
