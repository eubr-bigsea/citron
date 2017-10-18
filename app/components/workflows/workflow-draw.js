import EmberObject from '@ember/object';
import Component from '@ember/component';
import Ps from 'npm:perfect-scrollbar';

export default Component.extend({
  forms: EmberObject.create(),
  task: null,
  filledForms: EmberObject.create(),
  didInsertElement(){
    Ps.initialize(document.getElementById("lemonade-container"));
  }
});
