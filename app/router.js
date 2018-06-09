import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
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
    });
    this.route('datasources', function() {
      this.route('edit', {path: ':id/edit'});
    });
    this.route('dashboards', function() {
      this.route('show', {path: ':id/show'});
    });
    this.route('user', function() {
      this.route('edit', {path: ':id/edit'});
      this.route('show', {path: ':id/show'});
    });
    this.route('not-found');
  });

  this.route('login');
  this.route('signup');
  this.route('password', {path:'password'}, function() {
    this.route('request');
    this.route('edit', {path: ':id'});
  });
  this.route('group', {path: 'group/:id'});
  this.route('policy');
  this.route('maintenance');
  this.route('visualizations');
  this.route('not-found', {path: '/*path'});
  this.route('documentation');
});

export default Router;
