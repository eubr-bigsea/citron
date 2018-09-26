import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
