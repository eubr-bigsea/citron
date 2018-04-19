import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  didInsertElement() {
    this.$().hover(function() {
      let mainWrapper = $("#main-wrapper");

      if(!mainWrapper.hasClass("locked")){
        mainWrapper.toggleClass('toggled')
      }
    });
  },

  actions: {
    show(){ $("#main-wrapper").addClass("toggled"); },
    hide(){ $("#main-wrapper").removeClass("toggled"); },
  },
});
