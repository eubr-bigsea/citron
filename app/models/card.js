import Ember from 'ember';
import DS from 'ember-data';

const { attr, belongsTo } = DS;


export default DS.Model.extend({
  user: belongsTo('user'),

  category: attr('string'),
  title: attr('string'),
  link: attr('string'),
  content: attr('string'),
  updated_at: attr('dates'),
  created_at: attr('dates'),
});
