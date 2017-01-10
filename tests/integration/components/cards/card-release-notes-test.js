import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cards/card-release-notes', 'Integration | Component | cards/card release notes', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  var testModel = {
    message: 'this is a test message.' ,
    version: 'X.X',
    date: 'dd/mm/yyyy'
  };
  this.set('releaseNotesTest', testModel);

  this.render(hbs`{{cards/card-release-notes releaseNotes=releaseNotesTest}}`);

  assert.equal(this.$('#release-notes .title').text().trim(), `Release Notes - Lemonade ${testModel.version}`);
  assert.equal(this.$('#release-notes p').text().trim(), testModel.message);
  assert.equal(this.$('#release-notes #date').text().trim(), `Released at ${testModel.date}`);

});
