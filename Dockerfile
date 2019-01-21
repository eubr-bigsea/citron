FROM node:8 as ember_build
LABEL maintainer="Walter dos Santos Filho <walter AT dcc.ufmg.br> Guilherme Maluf Balzana <guimaluf AT dcc.ufmg.br"

ENV CITRON_HOME=/usr/local/citron
WORKDIR $CITRON_HOME
COPY . $CITRON_HOME

RUN yarn \
  && ./node_modules/ember-cli/bin/ember build --prod

###

FROM nginx:1.15-alpine
LABEL maintainer="Walter dos Santos Filho <walter AT dcc.ufmg.br> Guilherme Maluf Balzana <guimaluf AT dcc.ufmg.br"

ENV CITRON_HOME=/usr/local/citron
WORKDIR $CITRON_HOME

COPY extras/nginx.conf.sample /etc/nginx/conf.d/default.conf
COPY --from=ember_build /usr/local/citron/dist ./dist

EXPOSE 8080
