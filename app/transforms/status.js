import DS from 'ember-data';

export default DS.Transform.extend({
  capitalize(word) {
        return word.toLowerCase().charAt(0).toUpperCase() + word.slice(1);
  },

  statusHash:{
    COMPLETED:'fa fa-check fa-3x fa-fw completed',
    ERROR:'fa fa-exclamation-triangle fa-3x fa-fw error',
    CANCELED:'fa fa-times fa-3x fa-fw canceled',
    INTERRUPTED:'fa fa-exclamation-triangle fa-3x fa-fw interrupted',
    PENDING:'fa fa-hourglass-half fa-2x fa-fw pending',
    RUNNING:'fa fa-circle-o-notch fa-spin fa-3x fa-fw running',
    WAITING:'fa fa-clock-o fa-3x fa-fw waiting'
  },

  deserialize(serialized) {
    if(serialized){
      return serialized.toLowerCase();
    } else { return null; }
  },

  serialize(deserialized) {
    return deserialized;
  }
});
