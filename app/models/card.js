import DS from 'ember-data';

const { attr, hasMany } = DS;


export default DS.Model.extend({
  user: hasMany('user'),

  component: attr('string'),
  content: attr(),
  title: attr(),
  updated_at: attr('dates'),
  created_at: attr('dates'),
});
