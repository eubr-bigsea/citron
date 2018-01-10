import DS from 'ember-data';

const { attr } = DS;


export default DS.Model.extend({
  component: attr('string'),
  content: attr(),
  title: attr(),
  updated_at: attr('dates'),
  created_at: attr('dates'),
});
