import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    var cards = {
      releaseNotes: {
        message: "This is the version 2.0 of application Lemonade! With new operations, faster and simple to use this version brings the power of Apache Spark to execute data minning as easy as build a flow." ,
        version: "2.0",
        date: "01/01/2017"},
      videoTutorial: {
        title: "Basic Tutorial",
        youtubeID: "5_sHXJC9ocA"
      }
    };
    return cards;
  },
});
