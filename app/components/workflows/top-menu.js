import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),

  didInsertElement: function(){
    this.$('#flash').hide();
  
  },

  actions: {
    submit(){
      var checked = Ember.$(":checkbox:checked");
      var i;
      for (i=0; i<checked.length; i++){
        this.get('store').findRecord('workflow',checked[i].id).then(function(model){
          model.destroyRecord();
        });
      };
      this.set('modal3', false);
      $("#flash span").text("The checked workflows were deleted.").show().parent().fadeIn().delay(2000).fadeOut('slow', function() { $("#flash span").text('') });

    },
    deleteWorkflows(){
      this.set('modal3', true);
      
    },
  }
});
