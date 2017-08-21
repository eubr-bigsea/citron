import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/job-logger-content', 'Integration | Component | jobs/job logger content', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jobs/job-logger-content}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#jobs/job-logger-content}}
      template block text
    {{/jobs/job-logger-content}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
