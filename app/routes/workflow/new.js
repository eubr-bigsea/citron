import Ember from 'ember';
import RSVP from 'rsvp';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  currentUser: service('current-user'),
  session: service('session'),

  model() {
    this._super(...arguments);
    var currentUser = this.get('currentUser');
    var defaultWorkflow = {
      tasks: [],
      flows: [],
      platform: {id: '1'},
      user: currentUser,
      image: "img0.png",
      name: "My new Workflow",
      description: "My workflow..."
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
      var platform_id = Ember.$("#platform").val();
      workflow.set('platform.id', platform_id);
      workflow.save().then(() => {
        this.transitionTo('workflow.draw', workflow.get('id'), { queryParams: {platform: platform_id}} );
      });
    },
    selectImage(id, name){
      Ember.$('.image-container').removeClass('active');
      Ember.$(`#img${id}`).addClass('active');
      var workflow = this.currentModel.workflow;
      workflow.set('image', name);
    }
  },
});
