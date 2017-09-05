import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('landing-page');
  this.route('home', function() {
    this.route('workflows', function() {
      this.route('new');
      this.route('edit', {path: ':id/edit'});
      this.route('draw', {path: ':id/draw'});
    });
    this.route('jobs', function() {
      this.route('show', {path: ':id/show'});
      this.route('results', function() {
        this.route('index', {path: ':id'});
        this.route('visualizations', {path: ':jobId/visualizations/:taskId/:visu'});
      });
    });
  });
  this.route('login');
  this.route('signup');
  this.route('password', {path:'users/password'}, function() {
    this.route('request');
    this.route('edit');
  });
  this.route('datasource', function() {
    this.route('edit', {path: ':id/edit'});
  });
  this.route('user', {path: 'user/:id'});
  this.route('group', {path: 'group/:id'});
  this.route('policy');
  this.route('datasources');
  this.route('visualization');
  this.route('dashboards');
  this.route('dashboard', function() {
    this.route('show', {path: ':id/show'});
  });
  this.route('notFound', {path: '/*path'});

});

export default Router;
