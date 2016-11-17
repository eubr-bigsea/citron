import DS from 'ember-data';

export default DS.Transform.extend({
  months:['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],

  deserialize(serialized) {
    window.d = serialized;
    if(serialized){
    var date = serialized.split('T')[0].split('-');
    var time = serialized.split('T')[1].split(':');
    var hour = [time[0],time[1]].join(':');
    var month = this.get('months')[date[1]-1];
      return `${hour} - ${date[2]} ${month} ${date[0]}`;
    } else { return null; }
  },

  serialize(deserialized) {
    return deserialized;
  }
});
