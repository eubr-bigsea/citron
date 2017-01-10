import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cards/card-video-tutorial', 'Integration | Component | cards/card video tutorial', {
  integration: true
});

test('it renders frame', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cards/card-video-tutorial title='tutorial' youtubeID='8IJJGK2td2c'}}`);

  assert.equal(this.$('#video-tutorial .title').text().trim(), 'tutorial', 'title as tutorial');
});
