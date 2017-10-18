import Component from '@ember/component';

export default Component.extend({

  didInsertElement() {
    if(this.get("checked")) { d3.select("#toggle").attr("checked", true); }
  },

  actions: {
    toggle(){
      this.get('toggleAction')();
    }
  }

});
