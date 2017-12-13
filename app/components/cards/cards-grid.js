import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({

  didInsertElement(){
    this.set('grid', $('.grid-stack'));
    let grid = this.get('grid');
    let self = this;

    grid.gridstack({ alwaysShowResizeHandle: true });

    grid.on('change', function(event, items) {
      self.sendAction('saveGrid', items);
    });
  },
});
