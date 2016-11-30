import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  user: attr(),
  flows: attr(),
  tasks: attr(),
  platform_id: attr(),
  updated: attr('dates'),
  description: attr('string'),
});
