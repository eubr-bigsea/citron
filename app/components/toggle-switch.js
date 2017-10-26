import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({

  didInsertElement() {
    if(this.get("checked")) { $("#toggle").attr("checked", true); }
  },

  actions: {
    toggle(){
      this.get('toggleAction')();
    }
  }

});
