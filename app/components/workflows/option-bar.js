import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  sessionAccount: service(),
  store: service('store'),

  actions: {
    saveWorkflow() {
      this.get('workflow').save().then(
        () => {
          $("#flashSuccess").show().fadeIn().delay(2000).fadeOut('slow');
          this.get('hasChanged')(false);
        },
        () => { $("#flashError").show().fadeIn().delay(2000).fadeOut('slow'); }
      );
    },

    submit(){
      this.get('workflow').destroyRecord().then(
        () => { this.get('goTo')('workflows'); },
        () => { $("#flashError").show().fadeIn().delay(2000).fadeOut('slow'); }
      )
    },

    deleteWorkflow(){
      var modal = {
        title: 'modal.delete.workflow.title',
        message: 'modal.delete.workflow.message',
        submitButton: 'modal.delete.workflow.submitButton',
      };

      this.set('modalContent', modal);
      this.set('modal', true);
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
      this.get('workflow').save();
      let job = this.get('store').createRecord('job', jobHash);
      job.save().then(function(job){
        Ember.getOwner(component).lookup('router:main').transitionTo('job.show', job.id);
      } ).catch(function(error){ console.log(error) });
    },
  },
});
