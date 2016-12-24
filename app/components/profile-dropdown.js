import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Component.extend({
  classNames: ['profile', 'dropdown'],
  tagName: 'li',

  session: service('session'),
  currentUser: service('current-user'),

  actions: {
    getSession(){
    },
    invalidateSession(){
      this.get('session').invalidate();
    }
  }
});
