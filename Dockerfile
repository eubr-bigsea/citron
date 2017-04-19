# nginx is based on debia image
FROM nginx

MAINTAINER "Walter dos Santos Filho" <walter AT dcc.ufmg.br>

ENV CITRON_HOME=/usr/local/citron
RUN mkdir $CITRON_HOME
ADD app $CITRON_HOME/app
ADD config $CITRON_HOME/config
ADD ember-cli-build.js $CITRON_HOME/ember-cli-build.js
ADD package.json $CITRON_HOME/package.json
ADD public $CITRON_HOME/public
ADD vendor $CITRON_HOME/vendor

# Install Nodejs
RUN apt-get update -y
RUN apt-get install curl git -y
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

# Install Ember CLI
RUN npm install -g ember-cli

# Set registry for npm
RUN npm config set registry http://registry.npmjs.org/

RUN cd $CITRON_HOME && npm install && ember build --prod

EXPOSE 8080
# Add configuration for nginx
ADD config/nginx.conf.sample /etc/nginx/conf.d/default.conf
