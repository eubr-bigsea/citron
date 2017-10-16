import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service('store'),
  classNames:['table-item'],
  tagName: 'tr',
  toDelete: null,

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
