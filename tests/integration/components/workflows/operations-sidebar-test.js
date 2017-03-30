import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflows/operations-sidebar', 'Integration | Component | workflows/operations sidebar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{workflows/operations-sidebar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#workflows/operations-sidebar}}
      template block text
    {{/workflows/operations-sidebar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
