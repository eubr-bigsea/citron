import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  created: attr('dates'),
  started: attr('dates'),
  finished: attr('dates'),
  status:attr('status'),
  user: attr(),
  workflow: attr(),
});
