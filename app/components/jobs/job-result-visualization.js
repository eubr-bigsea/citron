import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({

  didInsertElement() {

    // Get window height
    var wHeight = $(window).outerHeight();

    // Get visual div and offset
    var wrap = $(`[data-id='${this.get('elementId')}']`);
    var offset = wrap.offset().top;

    // Set visual height
    wrap.css('height', (wHeight - offset) + 'px');

  }
});
