import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  slug: attr('string'),
  enabled: attr('boolean'),
  description: attr('string'),
  icon: attr('string'),
});
