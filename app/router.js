import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('landing-page');
  this.route('home');
  this.route('workflows');
  this.route('workflow', function() {
    this.route('new');
    this.route('edit', {path: ':id/edit'});
    this.route('draw', {path: ':id/draw'});
  });
  this.route('jobs');
  this.route('job', function() {
    this.route('show', {path: ':id/show'});
    this.route('results', {path: ':id/results'});
    this.route('result', {path: ':jobId/result/:taskId/:visu'});
    this.route('not-found');
  });
  this.route('login');
  this.route('signup');
  this.route('password', {path:'users/password'}, function() {
    this.route('request');
    this.route('edit');
  });
  this.route('datasource', function() {
    this.route('new');
    this.route('edit', {path: ':id/edit'});
    this.route('show', {path: ':id/show'});
  });
  this.route('user', {path: 'user/:id'});
  this.route('group', {path: 'group/:id'});
  this.route('policy');
  this.route('notFound', {path: '/*path'});
  this.route('datasources');
});

export default Router;
