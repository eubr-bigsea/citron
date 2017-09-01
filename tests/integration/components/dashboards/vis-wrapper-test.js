import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dashboards/vis-wrapper', 'Integration | Component | dashboards/vis wrapper', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dashboards/vis-wrapper}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dashboards/vis-wrapper}}
      template block text
    {{/dashboards/vis-wrapper}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
