FROM node:alpine as ember_build

LABEL maintainer="Walter dos Santos Filho <walter AT dcc.ufmg.br>"
LABEL maintainer="Guilherme Maluf Balzana <guimaluf at dcc.ufmg.br>"

# Install Nodejs
ENV CITRON_HOME=/usr/local/citron
ENV CITRON_GVIZ_HOME=/usr/local/citron/lib/gviz

WORKDIR $CITRON_HOME
COPY . $CITRON_HOME

WORKDIR $CITRON_GVIZ_HOME
RUN /usr/local/bin/yarn

WORKDIR $CITRON_HOME
RUN /usr/local/bin/yarn \
  && ./node_modules/ember-cli/bin/ember build --prod

FROM nginx:alpine
ENV CITRON_HOME=/usr/local/citron
WORKDIR $CITRON_HOME

COPY extras/entrypoint.sh $CITRON_HOME
COPY extras/update_env.py /usr/local/bin
COPY extras/nginx.conf.sample /etc/nginx/conf.d/default.conf
COPY --from=ember_build $CITRON_HOME/dist .

EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

