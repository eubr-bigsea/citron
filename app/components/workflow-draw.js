import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],
  tagName: 'div',
  forms: Ember.Object.create(),
  task: null,
  filledForms: Ember.Object.create(),
});
