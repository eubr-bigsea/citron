import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cards/card-video-tutorial', 'Integration | Component | cards/card video tutorial', {
  integration: true
});

test('it renders frame', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  var testModel = {
    title: "tutorial",
    youtubeID: "5_sHXJC9ocA"
  };
  this.set('videoTutorialTest', testModel);
  this.render(hbs`{{cards/card-video-tutorial videoTutorial= videoTutorialTest }}`);

  assert.equal(this.$('#video-tutorial .title').text().trim(), testModel.title, 'title as tutorial');
});
