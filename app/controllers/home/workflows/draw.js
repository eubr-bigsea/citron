import Controller from '@ember/controller';
import jsPlumb from '@jsplumb';
import { computed } from '@ember/object';
import $ from 'jquery';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import toposort from 'lemonade-ember/utils/toposort';

export default Controller.extend({
  sessionAccount: service(),
  store: service('store'),

  //Modals triggers
  executionModal: false,
  deleteModal: false,
  alertModal: false,
  unsavedModal: false,

  alertContent: null,
  jobHash: null,

  hasChanged: false,
  transition: null,
  cluster: null,
  jsplumb: null,

  // Zoom property for jsPlumb
  zoomScale: 1,
  zoomMax: computed('zoomScale', function(){ return this.get('zoomScale') >= 1.4 ? 'deactive' : 'active' }),
  zoomMin: computed('zoomScale', function(){ return this.get('zoomScale') <= 0.7 ? 'deactive' : 'active' }),

  init(){
    this._super(...arguments);
    this.set('jsplumb', jsPlumb.getInstance());
  },

  actions: {
    saveWorkflow(){
      const workflow = this.get('model.workflow');

      workflow.save().then(
        () => { // Success
          const title = 'workflows.alert-modal.saveSuccess.title';
          const message = 'workflows.alert-modal.saveSuccess.message';

          this.set('hasChanged', false);
          this.set('alertContent', { title, message });
          this.toggleProperty('alertModal');
        },
        () =>  { // Failed
          const title = 'workflows.alert-modal.saveFailed.title';
          const message = 'workflows.alert-modal.saveFailed.message'

          this.set('alertContent', { title, message });
          this.toggleProperty('alertModal');
        }
      );
    },

    toggleDeleteModal(){
      this.toggleProperty('deleteModal');
    },

    deleteWorkflow(){
      const workflow = this.get('model.workflow');

      this.set('deleteModal', false);

      workflow.destroyRecord().then(
        () => { // Success
          const title = 'workflows.alert-modal.deleteSuccess.title';
          const message = 'workflows.alert-modal.deleteSuccess.message';

          this.set('alertContent', { title, message });
          this.toggleProperty('alertModal');
          this.set('hasChanged', false);
          run.later(() => {
            this.set('alertContent', {});
            this.set('alertModal', false);
            this.transitionToRoute('home'); }, 2000);
        },
        () =>  { // Failed
          const title = 'workflows.alert-modal.deleteFailed.title';
          const message = 'workflows.alert-modal.deleteFailed.message';

          this.set('alertContent', { title, message });
          this.toggleProperty('alertModal');
        }
      );

    },

    zoomIn(){
      let scale = this.get('zoomScale');

      if(scale < 1.4){
        scale = scale + 0.1;
        $('#lemonade-diagram').animate({ 'zoom': scale }, 400);
        this.get('jsplumb').setZoom(scale);
        this.set('zoomScale', scale);
      }
    },

    zoomOut(){
      let scale = this.get('zoomScale');

      if(scale > 0.7){
        scale = scale - 0.1
        $('#lemonade-diagram').animate({ 'zoom': scale }, 400);
        this.get('jsplumb').setZoom(scale);
        this.set('zoomScale', scale);
      }
    },

    toggleExecutionModal(){
      this.toggleProperty('executionModal');
    },

    executeWorkflow(){
      let workflow = this.get('model.workflow').toJSON({ includeId: true });
      let aux = A();
      const sort = toposort(workflow.flows.map((el) => { return [el.source_id, el.target_id] }));

      workflow.tasks.mapBy('id').forEach( (id) => { if(!sort.includes(id)){ sort.push(id); } } );
      sort.forEach( (id) => { aux.pushObject(workflow.tasks.findBy('id', id)) } );
      workflow.tasks = aux;

      this.set('model.workflow.tasks', aux);

      this.get('model.workflow').save().then(
        (workflow) => {
          this.set('executionModal', false);
          this.set('hasChanged', false);
          const user = this.get('sessionAccount.user');
          let jobHash = this.get('jobHash');

          jobHash.user = { id: user.get('id'), login: user.get('email'), name: user.get('name')};
          jobHash.workflow = workflow.toJSON({ includeId: true });

          const job = this.get('store').createRecord('job', jobHash);

          job.save().then(
            (job) => {
              this.set('hasChanged', false);
              this.transitionToRoute('home.jobs.show', job.id);
            },
            () =>{ // Start Job Failed
              const title = 'workflows.alert-modal.executionFailed.title';
              const message = 'workflows.alert-modal.executionFailed.message';
              this.set('alertContent', { title, message });
              this.toggleProperty('alertModal');
            }
          );
        },
        () => { // Save Error
          const title = 'workflows.alert-modal.saveFailed.title';
          const message = 'workflows.alert-modal.saveFailed.message';

          this.set('alertContent', { title, message });
          this.toggleProperty('alertModal');
        }
      );
    },

    abortTransition(){
      this.set('transition', null);
      this.set('unsavedModal', false);
    },

    retryTransition(){
      this.set('hasChanged', false);
      this.set('unsavedModal', false);
      this.get('transition').retry();
    },
  },
});
