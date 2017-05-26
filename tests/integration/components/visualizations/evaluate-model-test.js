import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/evaluate-model', 'Integration | Component | visualizations/evaluate model', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/evaluate-model}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/evaluate-model}}
      template block text
    {{/visualizations/evaluate-model}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
