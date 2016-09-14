import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if(true) { /*Authentication*/
      this.transitionTo('workflows');
    } else {
    }
  }
});
