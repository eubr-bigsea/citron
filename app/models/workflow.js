import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  user_id: attr('number'),
  user_login: attr('string'),
  user_name: attr('string'),
  flows: attr(),
  tasks: attr(),
  updated: attr('dates'),
  description: attr('string'),
});
