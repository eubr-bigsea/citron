import Controller from '@ember/controller';

export default Controller.extend({
  queryParams:['platform'],
  platform: null,
  hasChanged: false,
  modalContent: null,
  cluster: null,

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

    goTo(routeName, params){
      this.set('hasChanged', false);
      if(params){
        this.transitionToRoute(routeName, params);
      } else {
        this.transitionToRoute(routeName);
      }
    },
  },
});
