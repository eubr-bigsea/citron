import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/report-modal', 'Integration | Component | jobs/report modal', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jobs/report-modal}}`);

  assert.equal(this.$().text().trim(), 'Job Report\n  ×\n  Ok');
});
