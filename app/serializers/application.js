import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse (store, primaryModelClass, payload, id, requestType) {
    let key = Ember.Inflector.inflector.pluralize(primaryModelClass.modelName);
    payload = {[`${key}`]: payload};

    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
