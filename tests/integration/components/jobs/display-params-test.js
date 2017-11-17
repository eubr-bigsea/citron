import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/display-params', 'Integration | Component | jobs/display params', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jobs/display-params}}`);

  assert.equal(this.$().text().trim(), 'AttributesValues');
});
