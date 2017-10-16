import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  session: service('session'),

  beforeModel(){
    var isAuthenticated = this.get('session.isAuthenticated');
    if(isAuthenticated){
      this.replaceWith('home');
    } else {
      this.replaceWith('landing-page');
    }
  }
});
