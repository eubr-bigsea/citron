import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visualizations/topicos-vis', 'Integration | Component | visualizations/topicos vis', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visualizations/topicos-vis}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visualizations/topicos-vis}}
      template block text
    {{/visualizations/topicos-vis}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
