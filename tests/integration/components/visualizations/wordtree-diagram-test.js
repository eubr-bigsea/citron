import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/wordtree-diagram', 'Integration | Component | visualizations/wordtree diagram', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/wordtree-diagram}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/wordtree-diagram}}
      template block text
    {{/visualizations/wordtree-diagram}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
