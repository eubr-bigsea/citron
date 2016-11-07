import DS from 'ember-data';

export default DS.Transform.extend({
  months:['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],

  deserialize(serialized) {
    var date = serialized.split('T')[0].split('-');
    var month = this.get('months')[date[1]-1];
    return [date[2],month,date[0]].join(' ');
  },

  serialize(deserialized) {
    return deserialized;
  }
});
