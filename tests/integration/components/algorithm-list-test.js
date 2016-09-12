import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('algorithm-list', 'Integration | Component | algorithm list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{algorithm-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#algorithm-list}}
      template block text
    {{/algorithm-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
