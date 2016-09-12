import Ember from 'ember';
/* global animate */

export default Ember.Component.extend({
  didInsertElement() {
    Ember.$('.nav-profile > li > a').on('click', function() {
      animate({
        name: 'flipInX',
        selector: Ember.$(this).next()
      });
    });
  }
});
