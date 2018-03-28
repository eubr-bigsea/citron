import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    if(serialized){
      return serialized.toLowerCase();
    } else { return null; }
  },

  serialize(deserialized) {
    return deserialized;
  }
});
