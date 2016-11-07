import Ember from 'ember';

export default Ember.Component.extend({
  forms: Ember.Object.create(),
  task: null,
  filledForms: Ember.Object.create(),
});
