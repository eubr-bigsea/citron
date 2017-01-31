import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/sentimentos/table-chart', 'Integration | Component | visualizations/sentimentos/table chart', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/sentimentos/table-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/sentimentos/table-chart}}
      template block text
    {{/visualizations/sentimentos/table-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
