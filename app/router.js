import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('workflow', function() {
    this.route('new');
    this.route('edit', {path: ':id/edit'});
    this.route('tasks');
    this.route('draw', {path: ':id/draw'});
    this.route('params', {path: ':id/params'});
  });
  this.route('datasource', function() {
    this.route('new');
    this.route('edit', {path: ':id/edit'});
  });
  this.route('job', function() {
    this.route('show', {path: ':id/show'});
    this.route('result', {path: ':id/result'});
    this.route('visualization', {path: ':id/visualization'});
  });
  this.route('login');
  this.route('signup');
  this.route('policy');
  this.route('password', {path:'users/password'}, function() {
    this.route('request');
    this.route('edit');
  });
  this.route('home', function() {
    this.route('workflows');
    this.route('datasources');
    this.route('configurations');
    this.route('jobs');
  });
  this.route('landing-page');
  this.route('user', {path: 'user/:id'});
  this.route('group', {path: 'group/:id'});
});

export default Router;
