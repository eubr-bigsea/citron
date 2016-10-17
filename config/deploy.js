/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  var rsync = {
      type: 'rsync',
      dest: '/var/www/html',
      host: process.env.DEPLOY_HOST,
      ssh: true,
      recursive: true,
      delete: true,
      args: ['--verbose', "--rsync-path='sudo -u www-data rsync'", '-ztl']
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure HOST variable at .env.deploy.development file
    ENV.rsync = rsync
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure HOST variable at .env.deploy.staging file
    ENV.rsync = rsync
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure HOST variable at .env.deploy.production file
    ENV.rsync = rsync
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
