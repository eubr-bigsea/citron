import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams:['platform'],
  platform: null,
  targetName: null,
  hasChanged: false,
  modalContent: null,

  actions: {
    hasChanged(param){
      this.set('hasChanged', param);
    },

    confirmedTransition(){
      this.transitionToRoute(this.get('targetName'));
      this.set('modal', false);
      this.set('targetName', null);
      this.set('hasChanged', false);
    },

    canceledTransition(){
      this.set('modal', false);
      this.set('targetName', null);
    },

    goTo(routeName){
      this.set('hasChanged', false);
      this.transitionToRoute(routeName);
    },
  },
});
