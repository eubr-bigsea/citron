import { computed } from '@ember/object';
import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  //Relationships
  datasources: hasMany('datasource', { async: true }),
  workflows: hasMany('workflow', { async: true }),
  jobs: hasMany('job', { async: true }),
  cards: hasMany('card'),

  //Profile info
  firstName: attr(''),
  lastName: attr(''),
  email: attr(''),
  locale: attr(''),
  profilePicture: attr(''),
  name: computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),

  //Authentication
  authenticationToken: attr(''),
  password: attr(''),
  passwordConfirmation: attr('')
});
