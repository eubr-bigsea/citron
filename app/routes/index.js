import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  beforeModel(){
    var currentUser = this.get('session.isAuthenticated');
    if(currentUser){
      this.transitionTo('home.workflows');
    } else {
      this.transitionTo('landing-page');
    }
  }
});
