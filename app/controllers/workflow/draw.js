import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams:['platform'],
  platform: null,
  targetName: null,

  actions: {
    confirmedTransition(){
      this.transitionToRoute(this.get('targetName'));
      this.set('targetName', null);
    },
    canceledTransition(){
      this.set('targetName', null);
      $('#confirm-modal').removeClass('show');
    },
  },
});
