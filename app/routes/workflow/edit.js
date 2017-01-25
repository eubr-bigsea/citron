import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(params){
    this._super(...arguments);
    return RSVP.hash({
      workflow: this.get('store').findRecord('workflow', params.id),
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
    save(){
      var workflow = this.currentModel.workflow;
      workflow.save();
      this.transitionTo('workflow.draw', workflow.id);
    },
    selectImage(id, name){
      Ember.$('.image-container').removeClass('active');
      Ember.$(`#img${id}`).addClass('active');
      var workflow = this.currentModel.workflow;
      workflow.set('image', name);
    }
  },
});
