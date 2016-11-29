import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  currentUser: service('current-user'),
  session: service('session'),

  model() {
    this._super(...arguments);
    var currentUser = this.get('currentUser');
    var defaultWorkflow = {
      tasks: [],
      flows: [],
      platform_id: '1',
      user: currentUser,
      name: "My new Workflow",
      description: "My workflow..."
    };
    return this.get('store').createRecord('workflow', defaultWorkflow);
  },
  actions:{
    create(){
      var workflow = this.currentModel;
      workflow.save().then(() => {
        this.transitionTo('workflow.draw', workflow.get('id'));
      });
    },
  },
});
