import Ember from 'ember';

export default Ember.Component.extend({
  boxes: [],
  didInsertElement() {
    Ember.$(`#${this.elementId}`).droppable({
      drop: (event, ui) => {
        this.get('boxes').addObject({
          name: ui.helper.html(),
          position: ui.position
        });
      }
    });
  },
  actions: {
    removeBox(box) {
      this.get('boxes').removeObject(box);
    }
  }
});
