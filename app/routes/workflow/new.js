import Ember from 'ember';
import RSVP from 'rsvp';

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
      platform: {id: '1'},
      user: currentUser,
      name: "My new Workflow",
      description: "My workflow..."
    };
    return RSVP.hash({
      workflow: this.get('store').createRecord('workflow', defaultWorkflow),
      platforms: this.store.query('platform', { enabled: true} )
    });
  },

  actions:{
    create(){
      var workflow = this.currentModel.workflow;
      var platform_id = Ember.$("#platform").val();
      workflow.set('platform.id', platform_id);
      workflow.save().then(() => {
        this.transitionTo('workflow.draw', workflow.get('id'), { queryParams: {platform: platform_id}} );
      });
    },
  },
});
