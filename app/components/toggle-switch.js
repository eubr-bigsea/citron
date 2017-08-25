import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    if(this.get("checked")) { d3.select("#toggle").attr("checked", true); }
  },

  actions: {
    toggle(){
      this.get('toggleAction')();
    }
  }

});
