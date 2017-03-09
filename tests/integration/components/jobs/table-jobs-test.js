import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/table-jobs', 'Integration | Component | jobs/table jobs', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jobs/table-jobs}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#jobs/table-jobs}}
      template block text
    {{/jobs/table-jobs}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
