import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('workflows');
  this.route('workflow', function() {
    this.route('new');
    this.route('draw', {path: ':id/draw'});
  });
  this.route('login');
  this.route('signup');
  this.route('policy');
  this.route('password', {path:'users/password'}, function() {
    this.route('request');
    this.route('edit');
  });
});

export default Router;
