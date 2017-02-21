import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/vis-card', 'Integration | Component | visualizations/vis card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/vis-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/vis-card}}
      template block text
    {{/visualizations/vis-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
