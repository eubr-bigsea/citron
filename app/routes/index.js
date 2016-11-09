import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),

  beforeModel(){
    var currentUser = this.get('session.data.authenticated.currentUser');
    if(currentUser){
      this.transitionTo('home.workflows');
    } else {
      this.transitionTo('landing-page');
    }
  }
});
