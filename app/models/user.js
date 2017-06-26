import DS from 'ember-data';
import Ember from 'ember';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  //Relationships
  datasources: DS.hasMany('datasource', { async: true }),
  workflows: DS.hasMany('workflow', { async: true }),
  jobs: DS.hasMany('job', { async: true }),
  cards: DS.hasMany('card'),

  //Profile info
  firstName: attr(''),
  lastName: attr(''),
  email: attr(''),
  locale: attr(''),
  profilePicture: attr(''),
  name: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),

  //Authentication
  authenticationToken: attr(''),
  password: attr(''),
  passwordConfirmation: attr('')
});
