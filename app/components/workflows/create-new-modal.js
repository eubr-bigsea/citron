import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Component.extend({
  store: service(),
  sessionAccount: service(),
  name: '',
  description: '',
  isPublic: false,
  image: null,

  didUpdateAttrs(){
    const firstImage = this.get('images.firstObject');
    this.set('name', '');
    this.set('descripition', '');
    this.set('isPublic', false);
    this.set('image', firstImage);
    this.set('platform', this.get('platforms.firstObject.id'));
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
        is_public: this.get('isPublic'),
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
    }
  }
});
