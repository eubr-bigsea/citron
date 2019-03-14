import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  categories: attr(),
  description: attr(),
  enabled: attr(),
  forms: attr(),
  icon: attr('string'),
  name: attr('string'),
  platforms: attr('string'),
  ports: attr(),
  slug: attr('string'),
  type: attr('string'),
  multiplicity: attr('string'),
  interfaces: attr(),
});
