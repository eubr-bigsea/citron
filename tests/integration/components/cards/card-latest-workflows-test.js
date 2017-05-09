import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cards/card-latest-workflows', 'Integration | Component | cards/card latest workflows', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cards/card-latest-workflows}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cards/card-latest-workflows}}
      template block text
    {{/cards/card-latest-workflows}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
