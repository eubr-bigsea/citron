import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin,{

  actions:{
    error(error, transition){
      if( error.isAdapterError){
        this.transitionTo('job.not-found');
      } else {
        this.transitionTo('404')
      }
    }
  },
});
