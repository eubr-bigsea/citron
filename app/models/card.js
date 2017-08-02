import DS from 'ember-data';

const { attr, hasMany } = DS;


export default DS.Model.extend({
  user: hasMany('user'),

  category: attr('string'),
  title: attr('string'),
  link: attr('string'),
  content: attr('string'),
  updated_at: attr('dates'),
  created_at: attr('dates'),
});
