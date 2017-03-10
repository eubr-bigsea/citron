import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/table-visualization', 'Integration | Component | visualizations/table visualization', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/table-visualization}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/table-visualization}}
      template block text
    {{/visualizations/table-visualization}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
