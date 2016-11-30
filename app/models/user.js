import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  firstname: DS.attr(''),
  lastname: DS.attr(''),
  email: DS.attr(''),
  name: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});
