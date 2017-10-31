import { A } from '@ember/array';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  i18n: service(),

  model(params) {
    let queryParams = {
      lang: this.get('i18n.locale')
    };

    return RSVP.hash({
      job: this.store.findRecord('job', params.id),
      operations: this.store.query('operation', queryParams)
    });
  },
  setupController(controller, model){
    this._super(...arguments);
    let job = model.job;
    let steps = job.get('steps');
    let results = job.get('results');
    let operations = model.operations;
    let tasks = model.job.get('workflow.tasks');
    tasks.forEach((task) => {
      var op = operations.findBy('id', String(task.operation.id));
      task.operation = op.toJSON({ includeId: true });

      task.step = steps.findBy('task.id', task.id);
      task.result = results.findBy('task.id', task.id);
    });



    controller.set('stepsLogs', A());
    controller.set('job', model.job);
    controller.set('operations', model.operations);
  }
});
