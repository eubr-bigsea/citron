import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement(){
    var expanded = true;
    Ember.$('#sidebar-collapse-btn').click(() => {
      if(!expanded){
        $('#sidebar-collapse-btn span').text("Hide");
        expanded=true;
      }else{
        $('#sidebar-collapse-btn span').text("Show");
        expanded=false;
      }
    });
  }
});
