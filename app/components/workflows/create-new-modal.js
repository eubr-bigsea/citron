import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  sessionAccount: service(),
  name: '',
  description: '',
  isPublic: false,
  image: null,
  isSaveAs: computed('workflow', function() {
    return this.get('workflow') ? true : false;
  }),

  didUpdateAttrs(){
    const firstImage = this.get('images.firstObject');
    const workflow = this.get('workflow');
    this.set('image', firstImage);
    if(workflow){
      this.set('name', `${workflow.name} 2`);
      this.set('description', `${workflow.description}`);
      this.set('isPublic', workflow.isPublic );
      this.set('platform', workflow.platform.id);
    } else {
      this.set('name', '');
      this.set('description', '');
      this.set('isPublic', false);
      this.set('platform', this.get('platforms.firstObject.id'));
    }
  },

  didRender(){
    $('.images-container img').removeClass('selected');
    $(`.images-container #${this.get('image.id')}`).addClass('selected');
  },

  actions: {
    toggleIsPublic(){
      this.toggleProperty('isPublic');
    },
    selectImage(image){
      this.set('image', image);
      $('.images-container img').removeClass('selected');
      $(`.images-container #${image.id}`).addClass('selected');
    },
    createNew(){
      //add spinner loadding
      const user = this.get('sessionAccount.user');
      let json = {
        name: this.get('name'),
        description: this.get('description'),
        platform: { id: this.get('platform') },
        is_public: this.get('is_public'),
        image: this.get('image.name'),
        enabled: true,
        user: { id: user.get('id'), login: user.get('email'), name: user.get('name')}
      }

      let workflow = this.get('store').createRecord('workflow', json);
      workflow.save().then(
        (workflow) => {
          this.get('transitionToDraw')(workflow.get('id'), { queryParams: {platform: workflow.get('platform.id')} })
        }
      )
    },

    saveAs(){
      //add spinner loadding
      const user = this.get('sessionAccount.user');
      let json = this.get('workflow');
      json.name = this.get('name');
      json.description = this.get('description');
      json.platform = { id: json.platform.id }
      json.is_public = this.get('is_public');
      json.image = this.get('image.name');
      json.user = { id: user.get('id'), login: user.get('email'), name: user.get('name')};

      let workflow = this.get('store').createRecord('workflow', json);
      workflow.save().then(
        (workflow) => {
          this.get('transitionToDraw')(workflow.get('id'), { queryParams: {platform: workflow.get('platform.id')} })
        }
      )
    }
  }
});
