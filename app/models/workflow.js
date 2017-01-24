import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  image: attr('string'),
  name: attr('string'),
  user: attr(),
  flows: attr(),
  tasks: attr(),
  platform: attr(),
  updated: attr('dates'),
  description: attr('string'),
});
