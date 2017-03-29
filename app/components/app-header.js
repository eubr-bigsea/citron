import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Component.extend({
  session: service('session'),
  currentUser: service('current-user'),

  actions: {
    invalidateSession(){
      this.get('session').invalidate();
    }
  }
});
