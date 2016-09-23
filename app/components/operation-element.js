import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  didInsertElement() {
    Ember.$(`#${this.elementId}`).draggable({
      zIndex: 10000,
      appendTo: '#diagram',
      opacity: 0.3,
      helper: () => Ember.$(`<div class='box'>${this.operation.name}</div>`)
    });
  }
});
