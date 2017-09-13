import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/source-code-modal', 'Integration | Component | jobs/source code modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jobs/source-code-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#jobs/source-code-modal}}
      template block text
    {{/jobs/source-code-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
