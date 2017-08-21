import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    var self = this;

    if(self.get("checked")) { d3.select("#toggle").attr("checked", true); }
  },

  actions: {
    toggle(){
      this.get('toggleAction')();
    }
  }

});
