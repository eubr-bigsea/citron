import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeSaveResponse(store, primaryModelClass, payload, id, requestType) {
    return this._super(store, primaryModelClass, payload.data, id, requestType);
  },
});
