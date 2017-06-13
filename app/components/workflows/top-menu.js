import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  store: service(),
  errors: null,
  selectedWorkflows: 0,

  actions: {
    submit(){
      var errors = [];
      var checked = $(":checkbox:checked");
      this.set('selectedWorkflows', checked.length);

      if(checked.length){
        for (var i=0; i<checked.length; i++){
          this.get('store').findRecord('workflow',checked[i].id).then(
            function(workflow){ workflow.destroyRecord(); },
            function(){ errors.push(checked[i].id); }
          );
        }
        if(errors.length){
          errors = errors.join(' ');
          this.set('errors', errors);
          $("#flashError").show().fadeIn().delay(2000).fadeOut('slow');
        } else {
          $("#flashSuccess").show().fadeIn().delay(2000).fadeOut('slow');
        }
      }
      this.set('modal', false);
    },

    deleteWorkflows(){
      var checked = Ember.$(":checkbox:checked");
      this.set('selectedWorkflows', checked.length);

      var modal = {
        title: 'modal.delete.workflows.title',
        message: 'modal.delete.workflows.message',
        submitButton: 'modal.delete.workflows.submitButton',
      };

      this.set('modalContent', modal);
      this.set('modal', true);
    },
  }
});
