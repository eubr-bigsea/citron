/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "bootstrap" }]*/
import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import bootstrap from 'npm:bootstrap'; //not delete

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
