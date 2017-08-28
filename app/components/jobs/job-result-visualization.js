import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {

    // Get window height
    var wHeight = jQuery(window).outerHeight();

    // Get visual div and offset
    var wrap = Ember.$(`[data-id='${this.get('elementId')}']`);
    var offset = wrap.offset().top;

    // Set visual height
    wrap.css('height', (wHeight - offset) + 'px');

  }
});
