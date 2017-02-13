import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/vis-cards-container', 'Integration | Component | visualizations/vis cards container', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/vis-cards-container}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/vis-cards-container}}
      template block text
    {{/visualizations/vis-cards-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
