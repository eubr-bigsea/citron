import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('algorithms-list', 'Integration | Component | algorithms list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{algorithms-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#algorithms-list}}
      template block text
    {{/algorithms-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
