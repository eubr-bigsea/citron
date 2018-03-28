import Route from '@ember/routing/route';

export default Route.extend({
  model(params){
    this._super(...arguments);
    return this.store.findRecord('datasource', params.id);
  },
  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.set('alertModal', false);
      controller.set('alertContent', null);
    }
  },

  actions: {
    reloadModel(){
      this.refresh();
    },
  }
});
