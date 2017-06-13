import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  /* Config STAND */
  user: attr(),
  workflow: attr(),
  cluster: attr(),
  created: attr('dates'),
  started: attr('dates'),
  finished: attr('dates'),
  status: attr('status'),
  steps: attr(),
  results: attr(),
  status_text: attr(),
});
