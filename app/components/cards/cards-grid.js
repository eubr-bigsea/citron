import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({

  didInsertElement(){
    this.set('grid', $('.grid-stack'));
    let grid = this.get('grid');
    let self = this;

    grid.gridstack({
      animate: true,
      alwaysShowResizeHandle: true
    });

    grid.on('change', function(event, items) {
      var conf = [];
      items.forEach((card) => {
        conf.push( {
          card_id: card.el.data('card-id'),
          component: card.el.data('card-component'),
          x: card.x,
          y: card.y,
          width: card.width,
          height: card.height
        });
      });
      self.sendAction('saveGrid', conf);
    });
  },

});
