import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  actions: {
    showSession(){
      console.log(this.get('session'));
    },
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
