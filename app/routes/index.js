import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  beforeModel(){
    var currentUser = this.get('session.isAuthenticated');
    if(currentUser){
      this.replaceWith('home.workflows');
    } else {
      this.replaceWith('landing-page');
    }
  }
});
