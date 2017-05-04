# nginx is based on debia image
FROM nginx

MAINTAINER "Walter dos Santos Filho" <walter AT dcc.ufmg.br>

ENV CITRON_HOME=/usr/local/citron
WORKDIR $CITRON_HOME

COPY . $CITRON_HOME
COPY extras/entrypoint.sh $CITRON_HOME
COPY extras/update_env.py /usr/local/bin
# Add configuration for nginx
COPY extras/nginx.conf.sample /etc/nginx/conf.d/default.conf

# Install Nodejs
RUN apt-get update && apt-get install -y \
      python2.7 \
      curl \
      gnupg2 \
  && curl -sL https://deb.nodesource.com/setup_7.x | bash - \
  && apt-get update && apt-get install -y nodejs \
  && rm -rf /var/lib/apt/lists/* \
	&& npm install -g ember-cli \
	&& npm config set registry http://registry.npmjs.org/ \
	&& npm install \
  && ember build --prod

EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

