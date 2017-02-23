import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams:['platform'],
  platform: null,
  targetName: null,
  hasChanged: false,
  message: {
    type: null,
    content: null,
    func: null
  },

  actions: {
    hasChanged(param){ this.set('hasChanged', param); },
    alert(param){
      this.set('message', param);
      $('#confirm-modal').addClass('show');
    },
    confirmedTransition(){
      this.transitionToRoute(this.get('targetName'));
      this.set('targetName', null);
      this.set('hasChanged', false);
    },
    canceledTransition(){
      this.set('targetName', null);
      $('#confirm-modal').removeClass('show');
    },
  },
});
