import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  title: attr(),
  created: attr('dates'),
  updated: attr('dates'),
  task_id: attr(),
  job_id: attr(),
  visualizations: attr(),
  user: attr()
});
