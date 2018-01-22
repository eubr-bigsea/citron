import EmberObject from '@ember/object';
import Component from '@ember/component';
import Ps from '@perfect-scrollbar';

export default Component.extend({
  forms: EmberObject.create(),
  task: null,
  filledForms: EmberObject.create(),
  didInsertElement(){
    new Ps("#lemonade-container");
  }
});
