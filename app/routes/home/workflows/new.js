import $ from 'jquery';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  sessionAccount: service(),
  session: service('session'),

  model() {
    this._super(...arguments);
    var defaultWorkflow = {
      tasks: [],
      flows: [],
      platform: {id: '1'},
      image: "img0.png",
      name: "",
      description: "",
      enabled: true,
      is_public: false,
    };
    return RSVP.hash({
      workflow: this.get('store').createRecord('workflow', defaultWorkflow),
      platforms: this.store.query('platform', { enabled: true} ),
      images:
      [
        {name: 'img0.png', id: 0},
        {name: 'img1.png', id: 1},
        {name: 'img2.jpg', id: 2},
        {name: 'img3.jpg', id: 3},
        {name: 'img4.jpg', id: 4},
        {name: 'img5.jpg', id: 5},
        {name: 'img6.jpg', id: 6},
        {name: 'img7.jpg', id: 7},
        {name: 'img8.jpg', id: 8},
        {name: 'img9.png', id: 9},
      ]
    });
  },

  actions:{
    create(){
      var workflow = this.currentModel.workflow;
      var platform_id = $("#platform").val();
      var user = this.get('sessionAccount.user');

      workflow.set('platform.id', platform_id);
      workflow.set('user', { id: user.get('id'), login: user.get('email'), name: user.get('name')});
      workflow.save().then(() => {
        this.transitionTo('home.workflows.draw', workflow.get('id'), { queryParams: {platform: platform_id}} );
      });
    },
    selectImage(id, name){
      $('.image-container').removeClass('active');
      $(`#img${id}`).addClass('active');
      var workflow = this.currentModel.workflow;
      workflow.set('image', name);
    }
  },
});
