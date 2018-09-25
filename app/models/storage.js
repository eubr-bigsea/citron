import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  type: attr('string'),
  enabled: attr('boolean'),
  url: attr('string')
});
