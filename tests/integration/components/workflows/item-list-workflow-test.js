import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflows/item-list-workflow', 'Integration | Component | workflows/item list workflow', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{workflows/item-list-workflow}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#workflows/item-list-workflow}}
      template block text
    {{/workflows/item-list-workflow}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
