import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  didInsertElement() {
    let id   = this.get('operation.id');
    let name = this.get('operation.name');
    Ember.$(`#${this.elementId}`).draggable({
      zIndex: 10000,
      appendTo: '#diagram',
      opacity: 0.3,
      helper: () => Ember.$(`<div class='box' data-opid='${id}'>${name}</div>`)
    });
  }
});
