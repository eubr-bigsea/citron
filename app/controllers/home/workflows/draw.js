/* global Set TahitiAttributeSuggester*/
import Controller from '@ember/controller';
import $ from 'jquery';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import toposort from 'citron/utils/toposort';
import config from '../../../config/environment';
import { set } from '@ember/object';
import generateUUID from 'citron/utils/generate-uuid';
import { copy } from '@ember/object/internals';

export default Controller.extend({
  sessionAccount: service(),
  store: service(),
  // gets attributes from datasource to be used in suggestion attrs
  datasourceLoader(id, callback) {
    $.ajax({
      url: config.limonero + '/datasources/' + id,
      data: { attributes_name: true },
      success(response) {
        callback(
          response.attributes.map(function(attr) {
            return attr.name;
          })
        );
      },
      error() {
        callback(null);
      }
    });
  },

  //Modals triggers
  executionModal: false,
  createModal: false,
  deleteModal: false,
  alertModal: false,
  unsavedModal: false,
  editModal: false,

  alertContent: null,
  alertCallback: null,
  hasChanged: false,
  formsChanged: false,
  transition: null,
  willTransit: false,
  jobHash: null,

  // Diagram properties
  selectedTask: null,
  displayForm: false,
  attrsReady: false,

  actions: {
    toggleDeleteModal() {
      this.toggleProperty('deleteModal');
    },

    toggleExecutionModal() {
      this.toggleProperty('executionModal');
    },

    toggleEditModal() {
      this.toggleProperty('editModal');
    },

    transitionToDrawAfterSaveAs(id, queryParams) {
      const title = 'workflows.alert-modal.saveSuccess.title';
      const message = 'workflows.alert-modal.saveSuccess.message';

      this.set('hasChanged', false);
      this.set('alertContent', { title, message });
      this.set(
        'alertCallback',
        this.transitionToRoute('home.workflows.draw', id, queryParams)
      );
      this.toggleProperty('alertModal');
    },

    saveWorkflow(callback) {
      this.send('closeForms');
      let title;
      let message;

      let workflow = this.get('model.workflow');
      if (workflow.get('name') === '') {
        title = 'workflows.alert-modal.noName.title';
        message = 'workflows.alert-modal.noName.message';
        this.set('alertContent', { title, message });
        this.toggleProperty('alertModal');
      } else {
        workflow.get('tasks').forEach(task => {
          let op = task.operation;
          set(task, 'operation', {
            id: op.id,
            name: op.name,
            slug: op.slug
          });
          set(task, 'endpoints', null);
          set(task, 'uiPorts', null);
        });

        workflow.save().then(
          () => {
            // Success
            title = 'workflows.alert-modal.saveSuccess.title';
            message = 'workflows.alert-modal.saveSuccess.message';

            this.set('hasChanged', false);
            this.set('alertContent', { title, message });
            if (callback) {
              this.set('alertCallback', callback);
            }
            this.toggleProperty('alertModal');
          },
          () => {
            // Failed
            const title = 'workflows.alert-modal.saveFailed.title';
            const message = 'workflows.alert-modal.saveFailed.message';

            this.set('alertContent', { title, message });
            this.toggleProperty('alertModal');
          }
        );
      }
    },

    saveAsWorkflow() {
      this.send('closeForms');
      let workflow = this.get('model.workflow');
      workflow.get('tasks').forEach(task => {
        let op = task.operation;
        set(task, 'operation', {
          id: op.id,
          name: op.name,
          slug: op.slug
        });
        set(task, 'endpoints', null);
        set(task, 'uiPorts', null);
      });
      let newWorkflow = copy(workflow.toJSON(), true);
      newWorkflow.tasks.forEach(task => {
        const oldId = task.id;

        set(task, 'id', generateUUID());
        newWorkflow.flows.forEach(flow => {
          if (flow.source_id == oldId) {
            set(flow, 'source_id', task.id);
          }
          if (flow.target_id == oldId) {
            set(flow, 'target_id', task.id);
          }
        });
      });
      delete newWorkflow.created;
      delete newWorkflow.updated;
      delete newWorkflow.selected;

      this.set('newWorkflow', newWorkflow);
      this.set('createModal', true);
    },

    deleteWorkflow() {
      const workflow = this.get('model.workflow');

      this.set('deleteModal', false);

      workflow.destroyRecord().then(
        () => {
          // Success
          const title = 'workflows.alert-modal.deleteSuccess.title';
          const message = 'workflows.alert-modal.deleteSuccess.message';

          this.set('alertContent', { title, message });
          this.toggleProperty('alertModal');
          this.set('hasChanged', false);
          run.later(() => {
            this.set('alertContent', {});
            this.set('alertModal', false);
            this.transitionToRoute('home');
          }, 2000);
        },
        () => {
          // Failed
          const title = 'workflows.alert-modal.deleteFailed.title';
          const message = 'workflows.alert-modal.deleteFailed.message';

          this.set('alertContent', { title, message });
          this.toggleProperty('alertModal');
        }
      );
    },

    executeWorkflow() {
      this.send('closeForms');
      let workflow = this.get('model.workflow').toJSON({ includeId: true });
      let aux = A();
      const sort = toposort(
        workflow.flows.map(el => {
          return [el.source_id, el.target_id];
        })
      );

      workflow.tasks.mapBy('id').forEach(id => {
        if (!sort.includes(id)) {
          sort.push(id);
        }
      });
      sort.forEach(id => {
        aux.pushObject(workflow.tasks.findBy('id', id));
      });
      workflow.tasks = aux;

      this.set('model.workflow.tasks', aux);

      this.get('model.workflow.tasks').forEach(task => {
        let op = task.operation;
        set(task, 'operation', {
          id: op.id,
          name: op.name,
          slug: op.slug
        });
        set(task, 'endpoints', null);
        set(task, 'uiPorts', null);
      });

      this.get('model.workflow')
        .save()
        .then(
          workflow => {
            this.set('executionModal', false);
            this.set('hasChanged', false);
            const user = this.get('sessionAccount.user');
            let jobHash = this.get('jobHash');

            jobHash.user = {
              id: user.get('id'),
              login: user.get('email'),
              name: user.get('name')
            };
            jobHash.workflow = workflow.toJSON({ includeId: true });

            const job = this.get('store').createRecord('job', jobHash);

            job.save().then(
              job => {
                this.set('hasChanged', false);
                this.transitionToRoute('home.jobs.show', job.id);
              },
              () => {
                // Start Job Failed
                const title = 'workflows.alert-modal.executionFailed.title';
                const message = 'workflows.alert-modal.executionFailed.message';
                this.set('alertContent', { title, message });
                this.toggleProperty('alertModal');
              }
            );
          },
          () => {
            // Save Error
            const title = 'workflows.alert-modal.saveFailed.title';
            const message = 'workflows.alert-modal.saveFailed.message';

            this.set('alertContent', { title, message });
            this.toggleProperty('alertModal');
          }
        );
    },

    abortTransition() {
      this.set('transition', null);
      this.set('unsavedModal', false);
    },

    retryTransition() {
      this.set('hasChanged', false);
      this.set('unsavedModal', false);
      this.set('displayForm', false);
      this.set('selectedTask', null);
      this.get('transition').retry();
    },

    getAttributeSuggestions() {
      this.set('attrsReady', false);
      const workflow = this.get('model.workflow').toJSON({ includeId: true });
      const datasourceLoader = this.get('datasourceLoader');

      let callback = result => {
        let tasks = this.get('model.workflow.tasks');
        Object.keys(result).forEach(taskId => {
          let task = tasks.findBy('id', taskId);
          if (task) {
            set(task, 'uiPorts', result[taskId].uiPorts);
          }
        });
        this.set('attrsReady', true);
        if (this.get('selectedTask') !== null) {
          this.set('displayForm', true);
        }
      };
      run(() => {
        TahitiAttributeSuggester.compute(workflow, datasourceLoader, callback);
      });
    },

    closeForms() {
      this.set('selectedTask', null);
      this.set('displayForm', false);
      if (this.get('formsChanged')) {
        this.send('getAttributeSuggestions');
        this.set('formsChanged', false);
      }
    },

    clickTask(task) {
      run(() => {
        this.send('closeForms');
      });
      run.later(() => {
        this.set('selectedTask', task);
        if (this.get('attrsReady')) {
          this.set('displayForm', true);
        }
      });
    }
  }
});
