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
ADD extras/entrypoint.sh $CITRON_HOME
ADD extras/update_env.py /tmp
# Add configuration for nginx
ADD extras/nginx.conf.sample /etc/nginx/conf.d/default.conf
WORKDIR $CITRON_HOME

# Install Nodejs
RUN apt-get update -y && \
	apt-get install curl git -y && \
	curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
	apt-get install -y nodejs && \
	npm install -g ember-cli && \
	npm config set registry http://registry.npmjs.org/ && \
	npm install && ember build --prod && \
	chmod 755 entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

