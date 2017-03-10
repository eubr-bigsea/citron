import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    let results = Ember.A();

    this.get('job.results').forEach((el) => {
      let operation = this.get('operations').find(op => Number(op.id) === el.operation.id);

      results.addObject({
        jobId: this.get('job.id'),
        taskId: el.task.id,
        name: operation.get('name'),
        icon: operation.get('icon'),
        image: operation.get('icon'),
        tooltip: operation.get('description'),
        component: operation.get('slug'),
      });
    });

    this.set('results', results);
  }
});
