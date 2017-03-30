import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/job-container-diagram', 'Integration | Component | jobs/job container diagram', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jobs/job-container-diagram}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#jobs/job-container-diagram}}
      template block text
    {{/jobs/job-container-diagram}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
