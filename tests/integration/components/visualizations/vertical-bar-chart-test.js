import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/vertical-bar-chart', 'Integration | Component | visualizations/vertical bar chart', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/vertical-bar-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/vertical-bar-chart}}
      template block text
    {{/visualizations/vertical-bar-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
