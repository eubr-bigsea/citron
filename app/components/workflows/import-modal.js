import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import generateUUID from 'citron/utils/generate-uuid';
import { set } from '@ember/object';

export default Component.extend({
  file: null,
  hasError: null,
  sessionAccount: service(),
  store: service(),

  didReceiveAttrs(){
    this.set('file', null);
    this.set('hasError', null);
  },

  didRender(){
    $('.images-container img').removeClass('selected');
    $(`.images-container #${this.get('file.image.id')}`).addClass('selected');
  },

  actions: {
    toggleIsPublic(){
      this.toggleProperty('isPublic');
    },
    selectImage(image){
      this.set('file.image', image);
      $('.images-container img').removeClass('selected');
      $(`.images-container #${image.id}`).addClass('selected');
    },

    fileLoaded(file) {
      try {
        const data = JSON.parse(file.data)
        this.set('file', data)
      } catch(error) {
        this.set('hasError', error);
      }
    },
    createNew(){
      const user = this.get('sessionAccount.user');
      let newWorkflow = this.get('file');
      newWorkflow.tasks.forEach( task => {
        const oldId = task.id;

        set(task, 'id', generateUUID());
        newWorkflow.flows.forEach( flow => {
          if(flow.source_id == oldId) { set(flow, 'source_id', task.id) }
          if(flow.target_id == oldId) { set(flow, 'target_id', task.id) }
        })
      });
      delete newWorkflow.created
      delete newWorkflow.updated
      delete newWorkflow.selected
      delete newWorkflow.id
      delete newWorkflow.user
      newWorkflow.user = { id: user.get('id'), login: user.get('email'), name: user.get('name')}
      let workflow = this.get('store').createRecord('workflow', newWorkflow);
      workflow.save().then(
        (workflow) => {
          this.set('importModal', false);
          this.get('transitionToDraw')(workflow.get('id'), { queryParams: {platform: workflow.get('platform.id')} })
        }
      )

    }
  }
});
