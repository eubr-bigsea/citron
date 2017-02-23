import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  classNames:['row', 'option-bar'],

  currentUser: service('current-user'),
  store: service('store'),
  currentJob: null,

  actions: {
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
      job.save().then(function(job){
        component.get('hasChanged')(false);
        Ember.getOwner(component).lookup('router:main').transitionTo('job.show', job.id);
      });
    },
  },
});
