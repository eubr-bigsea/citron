import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  didInsertElement() {
    let opName = this.get('operation.name');
    Ember.$(`#${this.elementId}`).draggable({
      zIndex: 10000,
      appendTo: '#diagram',
      opacity: 0.3,
      helper: () => Ember.$(`<div class='box'>${opName}</div>`)
    });
  }
});
