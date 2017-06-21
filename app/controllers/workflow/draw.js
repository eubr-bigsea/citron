import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams:['platform'],
  platform: null,
  hasChanged: false,
  modalContent: null,

  actions: {
    hasChanged(param){
      this.set('hasChanged', param);
    },

    confirmedTransition(){
      this.set('modal', false);
      this.set('hasChanged', false);
      let previousTransition = this.get('previousTransition');
      if (previousTransition) {
        this.set('previousTransition', null);
        previousTransition.retry();
      }
    },

    canceledTransition(){
      this.set('modal', false);
      this.set('previousTransition', null);
    },

    goTo(routeName){
      this.set('hasChanged', false);
      this.transitionToRoute(routeName);
    },
  },
});
