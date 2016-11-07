import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  currentUser: service('current-user'),

  model() {
    this._super(...arguments);
    var user = this.get('currentUser');

    return this.get('store').createRecord('workflow', {
      tasks: [],
      flows: [],
      user_id: user.id,
      user_login: user.email,
      user_name: `${user.firstname} ${user.lastname}`,
      name: "My new Workflow",
      description: "My workflow..."
    });
  },
  actions:{
    create(){
      var workflow = this.currentModel;
      workflow.save().then(() => {
        this.transitionTo('workflow.edit', workflow.get('id'));
      });
    },
  },
});
