import Ember from 'ember';
import Ps from 'npm:perfect-scrollbar';

export default Ember.Component.extend({
  forms: Ember.Object.create(),
  task: null,
  filledForms: Ember.Object.create(),
  didInsertElement(){
    Ps.initialize(document.getElementById("lemonade-container"));
  }
});
