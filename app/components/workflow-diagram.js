import Ember from 'ember';

/* global jsPlumb */

export default Ember.Component.extend({
  boxes: [],
  didInsertElement() {
    Ember.$(`#${this.elementId}`).droppable({
      drop: (event, ui) => {
        this.get('boxes').addObject({
          opid: ui.helper.data('opid'),
          position: ui.position
        });
      }
    });
    this.set('jsplumb', jsPlumb.getInstance({Container: this.elementId}));
  },
  actions: {
    removeBox(box) {
      this.get('boxes').removeObject(box);
    }
  }
});
