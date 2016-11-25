import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],
  forms: Ember.Object.create(),
  task: null,
  filledForms: Ember.Object.create(),
});
