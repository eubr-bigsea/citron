import Ember from 'ember';
import Ps from 'npm:perfect-scrollbar';
export default Ember.Component.extend({
  didInsertElement(){
    Ps.initialize(document.getElementById("lemonade-container"));
  },
});
