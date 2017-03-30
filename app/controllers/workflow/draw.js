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
    deleteWorkflow(){
      $('#confirm-modal').removeClass('show');
      var controller = this;
      this.get('model.workflow').destroyRecord().then(function(){
        controller.set('hasChanged', false);
        var params = {
          type: 'Success',
          content:'Workflow has been deleted.',
          func: "Ember.getOwner(component).lookup('router:main').transitionTo('workflows');"
        };
        controller.set('message', params);
      $('#confirm-modal').addClass('show');
      });
    },
  },
});
