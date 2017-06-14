import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  store: service('store'),
  classNames:['table-item'],
  tagName: 'tr',

  actions: {
    submit(){
      this.get('workflow').destroyRecord().then(
        () => { $("#flashSuccess").show().fadeIn().delay(2000).fadeOut('slow'); },
        () => { $("#flashError").show().fadeIn().delay(2000).fadeOut('slow'); }
      )
    },

    deleteWorkflow(){
      var modal = {
        title: 'modal.delete.workflow.title',
        message: 'modal.delete.workflow.message',
        submitButton: 'modal.delete.workflow.submitButton',
      };

      this.set('modalContent', modal);
      this.set('modal', true);
    },
  },
});
