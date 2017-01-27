import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/correlation-matrix', 'Integration | Component | visualizations/correlation matrix', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/correlation-matrix}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/correlation-matrix}}
      template block text
    {{/visualizations/correlation-matrix}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
