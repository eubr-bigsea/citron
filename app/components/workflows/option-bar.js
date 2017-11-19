import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import $ from 'jquery';
import toposort from 'npm:toposort';

export default Component.extend({
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
        () => { this.get('goTo')('home.workflows'); },
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
      let workflow = this.get('workflow').toJSON({ includeId: true });
      var sort = toposort(workflow.flows.map((el) => { return [el.source_id, el.target_id] }));
      workflow.tasks.mapBy('id').forEach((id) => {
        if(!sort.includes(id)){
          sort.push(id);
        }
      });
      var aux = A();
      sort.forEach((id) => {
        aux.pushObject(workflow.tasks.findBy('id', id))
      })
      workflow.tasks = aux;
      this.set('workflow.tasks', aux);
      var user = this.get('sessionAccount.user');
      let jobHash = {
        name: 'teste',
        user: { id: user.get('id'), login: user.get('email'), name: user.get('name')},
        workflow: workflow,
        cluster: { id: this.get('cluster')}
      };
      this.get('workflow').save().then(() => {
        let job = this.get('store').createRecord('job', jobHash);
        job.save().then(function(job){
          component.get('goTo')('home.jobs.show', job.id);
        } ).catch(function(error){ console.log(error) });
      })
    },
  },
});
