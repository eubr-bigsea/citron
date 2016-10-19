import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeSaveResponse(store, primaryModelClass, payload, id, requestType) {
    let myPayload = requestType === "createRecord" ? payload : payload.data;

    return this._super(store, primaryModelClass, myPayload, id, requestType);
  },
});
