import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Component.extend({
  session: service('session'),
  currentUser: service('current-user'),

  tagName: 'header',
  classNames: ['header'],

  actions: {
    invalidateSession(){
      this.get('session').invalidate();
    }
  }
});
