import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if(true) { /*Authentication*/
      this.transitionTo('workflow', 1);
    } else {
    }
  }
});
