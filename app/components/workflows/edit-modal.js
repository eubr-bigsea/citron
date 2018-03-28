import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  didRender(){
    let image = this.get('images').findBy('name', this.get('workflow.image'));
    image = image ? image : this.get('images.firstObject')
    $('.images-container img').removeClass('selected');
    $(`.images-container #${image.id}`).addClass('selected');
  },

  actions: {
    save(){
      this.set('editModal', false);
      this.get('saveWorkflow')();
    },
    toggleIsPublic(){
      this.toggleProperty('workflow.is_public');
    },
    selectImage(image){
      this.set('workflow.image', image.name);
      $('.images-container img').removeClass('selected');
      $(`.images-container #${image.id}`).addClass('selected');
    }
  }
});
