/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'lemonade-ember',
    environment: environment,
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

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

    ENV['ember-simple-auth'] = {
      authorizer: 'authorizer:devise',
      routeAfterAuthentication: '/home'
    };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    // ENV.thorn = 'http://localhost:3000';
    ENV.thorn = 'http://citron.ctweb.inweb.org.br:3000';
    ENV.stand = 'http://beta.ctweb.inweb.org.br/stand';
    ENV.tahiti = 'http://beta.ctweb.inweb.org.br/tahiti';
    ENV.limonero = 'http://beta.ctweb.inweb.org.br/limonero';
    ENV.capirinha = 'http://beta.ctweb.inweb.org.br/caipirinha';
    ENV.webSocketIO = {
      url: 'http://beta.ctweb.inweb.org.br',
      namespace: '/stand',
      path: '/stand/socket.io'
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.thorn = 'http://citron.ctweb.inweb.org.br:3000';
    ENV.stand = 'http://beta.ctweb.inweb.org.br/stand';
    ENV.tahiti = 'http://beta.ctweb.inweb.org.br/tahiti';
    ENV.limonero = 'http://beta.ctweb.inweb.org.br/limonero';
    ENV.webSocketIO = {
      url: 'http://beta.ctweb.inweb.org.br',
      namespace: '/stand',
      path: '/stand/socket.io'
    };
  }

  return ENV;
};
