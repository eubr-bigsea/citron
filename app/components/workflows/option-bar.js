import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  currentUser: service('current-user'),
  store: service('store'),
  currentJob: null,

  actions: {
    saveWorkflow() {
      var component = this;
      this.get('workflow').save().then(function(){
        component.get('hasChanged')(false);
        component.get('alert')({
          type: 'Success',
          content:'All modifications has been saved.'
        });
      });
    },
    deleteWorkflow(){
      this.get('alert')({
        type: 'Delete',
        content:'Do you want to delete this workflow?',
      });
    },

    play(){
      //FIX THIS
      let workflow = {};
      workflow.id = this.get('workflow.id');
      workflow.image = this.get('workflow.image');
      workflow.name = this.get('workflow.name');
      workflow.user = this.get('workflow.user');
      workflow.tasks = this.get('workflow.tasks');
      workflow.flows = this.get('workflow.flows');
      workflow.platform = this.get('workflow.platform');
      workflow.updated = this.get('workflow.updated');
      workflow.description = this.get('workflow.description');
      let user = this.get('currentUser');
      let jobHash = {
        name: 'teste',
        user: user,
        workflow: workflow,
        cluster: { id: 1}
      };
      let component = this;
      let job = this.get('store').createRecord('job', jobHash);
      job.save().then(function(job){ Ember.getOwner(component).lookup('router:main').transitionTo('job.show', job.id); } );
    },
  },
});
