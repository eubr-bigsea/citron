import Ember from 'ember';

export default Ember.Component.extend({
  url: 'http://beta.ctweb.inweb.org.br/caipirinha/dashboard',
  myResults: Ember.A([
    {
      "type": "VISUALIZATION",
      "task": { "id": "4b7dcbe8-7b7e-4ca9-96ca-db8cdb4821f0" },
      "operation": { "id": 71 }
    },
    {
      "type": "VISUALIZATION",
      "task": { "id": "97d698e6-45f3-4416-8135-6636828b52ab" },
      "operation": { "id": 69 }
    },
    {
      "type": "VISUALIZATION",
      "task": { "id": "f540e4c6-99fc-4fca-906a-ab0b51b2d3d7" },
      "operation": { "id": 71 }
    }
  ]),
  init() {
    this._super(...arguments);

    let results = Ember.A();

    this.get('myResults').forEach((el) => {
      let operation = this.get('operations').find(op => Number(op.id) === el.operation.id);
      let jobId = this.get('job.id');

      results.addObject({
        name: operation.get('name'),
        icon: operation.get('icon'),
        tooltip: operation.get('description'),
        component: operation.get('slug'),
        url: [this.get('url'), this.get('job.id'), el.task.id].join('/'),
      });
    });

    this.set('results', results);
  }
});
