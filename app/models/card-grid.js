import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  user: belongsTo('user'),

  configurations: attr(),
  updated_at: attr('dates'),
  created_at: attr('dates'),
});

