import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lemonade-sidebar', 'Integration | Component | lemonade sidebar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{lemonade-sidebar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#lemonade-sidebar}}
      template block text
    {{/lemonade-sidebar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
