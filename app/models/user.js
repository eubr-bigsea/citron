import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  //Relationships
  datasources: DS.hasMany('datasource', { async: true }),
  workflows: DS.hasMany('workflow', { async: true }),
  jobs: DS.hasMany('job', { async: true }),

  //Profile info
  firstName: DS.attr(''),
  lastName: DS.attr(''),
  email: DS.attr(''),
  locale: DS.attr(''),
  profilePicture: DS.attr(''),
  name: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),

  //Authentication
  authenticationToken: DS.attr(''),
  password: DS.attr(''),
  passwordConfirmation: DS.attr('')
});
