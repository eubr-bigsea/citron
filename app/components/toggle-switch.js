import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    toggle(){
      this.get('toggleAction')();
    }
  }
});
