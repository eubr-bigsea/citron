# Citron
[![Build Status](https://travis-ci.org/eubr-bigsea/ember-citron.svg?branch=gm_deploy)](https://travis-ci.org/eubr-bigsea/ember-citron)

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* git clone https://github.com/eubr-bigsea/ember-citron.git
* `cd lemonade-ember`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running with docker
```
ember build
docker run -p 8080:80 -v $PWD/dist:/usr/share/nginx/html nginx
```
Now access `http://localhost:8080`

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Deployment options are defined on `config/deploy.js` or through variable
```
DEPLOY_HOST
```

Setup ssh-like server address at file `.env.delpoy.<environment>` where
environment can be production, staging or development.

```
cat << EOF > .env.deploy.development
DEPLOY_HOST=username@ember-example-server.com.br
EOF
```

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
