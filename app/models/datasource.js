import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  user_id:  DS.belongsTo('user'),
  created_at: attr('dates'),
  description: attr('string'),
  data_type: attr('string'),
  data_format: attr('string'),
  size: attr('string')
});
