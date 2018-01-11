/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'lemonade-ember',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    i18n:{
      defaultLocale: 'en'
    },
    sentry: {
      dns: 'https://41a865a4935e48a591714fdf12756e4e@sentry.io/236235'
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-simple-auth': {
      authorizer: 'authorizer:devise',
      routeAfterAuthentication: '/home',
      routeIfAlreadyAuthenticated: '/home'
    },
    emblemOptions: {
      blueprints: false
    }
  };

  if (environment === 'development') {
    ENV['ember-cli-mirage'] = { enabled: false };
    ENV.citron = 'http://localhost:4200';
    ENV.thorn = 'https://dev.ctweb.inweb.org.br/thorn';
    //ENV.thorn = 'http://localhost:3000';
    ENV.stand = 'https://dev.ctweb.inweb.org.br/stand';
    ENV.tahiti = 'https://dev.ctweb.inweb.org.br/tahiti';
    ENV.limonero = 'https://dev.ctweb.inweb.org.br/limonero';
    ENV.caipirinha = 'https://dev.ctweb.inweb.org.br/caipirinha';
    ENV.sentry = { dns: '' }
    ENV.webSocketIO = {
      url: 'https://dev.ctweb.inweb.org.br',
      namespace: '/stand',
      path: '/stand/socket.io'
    };
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.thorn = '';
  }

  if (environment === 'production') {
    ENV.thorn = 'http://demo.ctweb.inweb.org.br/thorn';
    ENV.stand = 'http://demo.ctweb.inweb.org.br/stand';
    ENV.tahiti = 'http://demo.ctweb.inweb.org.br/tahiti';
    ENV.limonero = 'http://demo.ctweb.inweb.org.br/limonero';
    ENV.caipirinha = 'http://demo.ctweb.inweb.org.br/caipirinha';
    ENV.webSocketIO = {
      url: 'http://demo.ctweb.inweb.org.br',
      namespace: '/stand',
      path: '/stand/socket.io'
    };
  }

  return ENV;
};
