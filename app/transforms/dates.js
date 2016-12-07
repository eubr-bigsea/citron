import DS from 'ember-data';


export default DS.Transform.extend({

  deserialize(serialized) {
    if(serialized){
      moment.locale();
      var dateFinal =  moment(serialized).format('ll HH:mm');
      return dateFinal;
    } else { return null; }
  },

  serialize(deserialized) {
    return deserialized;
  }
});
