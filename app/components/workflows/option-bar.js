import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  sessionAccount: service(),
  store: service('store'),
  currentJob: null,

  didInsertElement: function(){
    this.$('#flash').hide();
  },

  actions: {
    saveWorkflow() {
      $("#flash span").text("The workflow was saved.").show().parent().fadeIn().delay(2000).fadeOut('slow', function() { $("#flash span").text('') });
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
      var component = this;
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
      var user = this.get('sessionAccount.user');
      let jobHash = {
        name: 'teste',
        user: { id: user.get('id'), login: user.get('email'), name: user.get('name')},
        workflow: workflow,
        cluster: { id: 1}
      };
      let job = this.get('store').createRecord('job', jobHash);
      job.save().then(function(job){
        Ember.getOwner(component).lookup('router:main').transitionTo('job.show', job.id);
      } ).catch(function(error){ console.log(error) });
    },
  },
});
