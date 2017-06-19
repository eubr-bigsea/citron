import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

const { inject: { service} } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  sessionAccount: service(),

  model(){
    var userId = this.get('sessionAccount.userId')
    var params = {
      user_id: userId,
      enabled: true,
      page: '1',
      size: '5',
      sort: 'updated_at',
      asc: false
    };

    return RSVP.hash({
      workflows: this.store.query('workflow', params),
      jobs: this.store.query('job', params),
      releaseNotes: {
        message: "This is the version 0.1.0 of application Lemonade! With new operations, faster and simple to use this version brings the power of Apache Spark to execute data minning as easy as build a flow." ,
        version: "0.1.0",
        date: "11/06/2017"},
      videoTutorial: {
        title: "Basic Tutorial",
        youtubeID: "5_sHXJC9ocA"
      }
    });
  },
  setupController(controller, model){
    controller.set('locale', this.get('session.data.locale'));
    return this._super(controller, model);
  }

});
