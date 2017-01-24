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
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSCygJA-ekdyncq1BI1okQKzwnSo-JEad-yFyI5LOfNYE874K50",
      name: "My new Workflow",
      description: "My workflow..."
    };
    return RSVP.hash({
      workflow: this.get('store').createRecord('workflow', defaultWorkflow),
      platforms: this.store.query('platform', { enabled: true} ),
      images: [
        {name: img0.png,id: 0},
        {name: img1.png,id: 1},
        {name: img0.jpg,id: 0},
        {name: img0.png,id: 0},
        {name: img0.png,id: 0},
        {name: img0.png,id: 0},
        {name: img0.png,id: 0},
        {name: img0.png,id: 0},
        {name: img0.png,id: 0},

      ]
    });
  },

  actions:{
    create(){
      var workflow = this.currentModel.workflow;
      var platform_id = Ember.$("#platform").val();
      workflow.set('platform.id', platform_id);
      if(Ember.$(".image-container.active > .image").attr('style')){
        this.set('currentModel.image', Ember.$(".image-container.active > .image").attr('style').slice(22, -1).replace(/"/g, "").replace(/'/g,""));
      }
      workflow.save().then(() => {
        this.transitionTo('workflow.draw', workflow.get('id'), { queryParams: {platform: platform_id}} );
      });
    },
  },
});
