import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  firstname: DS.attr(''),
  lastname: DS.attr(''),
  email: DS.attr(''),
  name: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),
  datasources: DS.hasMany('datasource'),
  workflows: DS.hasMany('workflow'),
  jobs: DS.hasMany('job'),
});
