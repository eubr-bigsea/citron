import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  currentUser: Ember.inject.service('current-user'),
  model(){
    var userId = this.get('currentUser').id;

    return RSVP.hash({
      workflows: this.store.query('workflow', {user_id: userId}),
      jobs: this.store.query('job', {user_id: userId }),
      releaseNotes: {
        message: "This is the version 2.0 of application Lemonade! With new operations, faster and simple to use this version brings the power of Apache Spark to execute data minning as easy as build a flow." ,
        version: "2.0",
        date: "01/01/2017"},
      videoTutorial: {
        title: "Basic Tutorial",
        youtubeID: "5_sHXJC9ocA"
      }
    });
  },
});
