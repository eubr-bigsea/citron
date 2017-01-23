import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/graph-canvas', 'Integration | Component | visualizations/graph canvas', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/graph-canvas}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/graph-canvas}}
      template block text
    {{/visualizations/graph-canvas}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
