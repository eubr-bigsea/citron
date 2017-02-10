import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/search-tool', 'Integration | Component | visualizations/search tool', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/search-tool}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/search-tool}}
      template block text
    {{/visualizations/search-tool}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
