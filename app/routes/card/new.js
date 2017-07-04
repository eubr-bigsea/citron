import Ember from 'ember';
import RSVP from 'rsvp';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  sessionAccount: service(),
  session: service('session'),

  model() {
    this._super(...arguments);
    var defaultCard = {
      category: "message",
      title: "",
      content: "",
      link: "",
      enabled: true
    };
    return RSVP.hash({
      card: this.get('store').createRecord('card', defaultCard),
    });
  },

  actions:{
    create(){
      var card = this.currentModel.card;
      var platform_id = Ember.$("#platform").val();
      var user = this.get('sessionAccount.user');

      card.set('category', platform_id);
      //card.set('user', { id: user.get('id'), login: user.get('email'), name: user.get('name')});
      card.save().then(() => {
        this.transitionTo('home');
      });
    },
  },
});
