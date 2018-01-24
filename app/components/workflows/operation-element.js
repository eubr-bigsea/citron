import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'li',

  didInsertElement() {
    let id   = this.get('operation.id');
    let name = this.get('operation.name');
    let slug = this.get('operation.slug');
    $(`#${this.elementId}`).draggable({
      zIndex: 10000,
      appendTo: '#lemonade-container',
      opacity: 0.3,
      helper: () => $(
        `<div class='task' data-slug='${slug}' data-name='${name}' data-opid='${id}'>${name}</div>`
      )
    });
  }
});
