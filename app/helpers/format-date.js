import moment from 'npm:moment/min/moment-with-locales';
import Ember from 'ember';


export function formatDate(params, hash) {
  moment.locale(hash.locale);
  return moment(params, "YYYY-MM-DD HH:mm").format('ll HH:mm');
}

export default Ember.Helper.helper(formatDate);
