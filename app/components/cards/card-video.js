import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  didInsertElement(){
    var cardId = this.get('conf.card-id');

    this.get('store').findRecord('card', cardId, { reload: true }).then((card) => {
      this.set('card', card);
    });
  },

  didRender(){
    var width = $('#'+this.elementId + ' .card-block').width();
    var height = $('#'+this.elementId + ' .card-block').height();

    $('#EmberYoutube-player').height(height)
    $('#EmberYoutube-player').width(width);
  }
});
