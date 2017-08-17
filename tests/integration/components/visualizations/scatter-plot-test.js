import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/scatter-plot', 'Integration | Component | visualizations/scatter plot', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/scatter-plot}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/scatter-plot}}
      template block text
    {{/visualizations/scatter-plot}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
