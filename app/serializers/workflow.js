import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    return this._super(store, primaryModelClass, payload.data, id, requestType);
  },
  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    return this._super(store, primaryModelClass, payload.data, id, requestType);
  },
  normalizeSaveResponse(store, primaryModelClass, payload, id, requestType) {
    let myPayload = requestType === "createRecord" ? payload : payload.data;

    return this._super(store, primaryModelClass, myPayload, id, requestType);
  },
});
