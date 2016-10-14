import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr('number'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  lastLogin: DS.attr('date'),
  token: DS.attr('string'),
});
