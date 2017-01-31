import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Ember.Component.extend({

  session: service('session'),
  currentUser: service('current-user'),

  actions: {
    save(){
      this.transitionTo('home.workflows');
    },
  }
});
