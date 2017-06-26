import Ember from 'ember';
import DS from 'ember-data';

const { attr, belongsTo } = DS;


export default DS.Model.extend({
  user: belongsTo('user'),
  title: attr('string'),
  tipo: attr('number'),
  link: attr('string'),
  content: attr('string'),
  updated_at: attr('dates'),
  created_at: attr('dates'),
});
