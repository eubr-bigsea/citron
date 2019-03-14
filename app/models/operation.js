import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  icon: attr('string'),
  type: attr('string'),
  multiplicity: attr('string'),
  slug: attr('string'),
  categories: attr(),
  interfaces: attr(),
  ports: attr(),
  forms: attr(),
});
