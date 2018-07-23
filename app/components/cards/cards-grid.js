import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import generateUUID from 'citron/utils/generate-uuid';

export default Component.extend({
  store: service(),
  addingCards: false,
  addToGrid: null,

  init(){
    this._super(...arguments);
    this.get('store').findAll('card').then((cards) => {
      this.set('cards', cards);
    });
  },

  didInsertElement(){
    let self = this;
    let grid = $('.grid-stack');

    grid.gridstack({ alwaysShowResizeHandle: false });

    grid.on('change', function(event, items) {
      self.sendAction('saveGrid', items);
    });
  },

  didRender(){
    let grid = $('.grid-stack').data('gridstack');
    let addToGrid = this.get('addToGrid');
    if(addToGrid){
      grid.addWidget($(`#${addToGrid}`));
      this.set('addToGrid', null);
      this.set('addingCards', false);
    }
  },

  actions: {
    remove(uuid){
      let configurations = this.get('configurations');
      let grid = $('.grid-stack').data('gridstack');

      let el = configurations.findBy('uuid', uuid);
      configurations.removeObject(el);
      el = $(`#${uuid}`)
      grid.removeWidget(el, false);
    },

    toggleAddingCards(){
      this.toggleProperty('addingCards');
    },

    addCard(card){
      let configurations = this.get('configurations');
      let el = {
        'component': card.get('component'),
        'card-id': card.get('id'),
        'uuid': generateUUID(),
        'width': 6,
        'height': 5,
        'x': 0,
        'y': 0
      }
      configurations.pushObject(el);
      this.set('addToGrid', el.uuid);
    }
  },
});
