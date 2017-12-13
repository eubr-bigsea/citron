import { helper } from '@ember/component/helper';
import moment from 'npm:moment/min/moment-with-locales';


export function formatDate(params, hash) {
  var locale = hash.locale? hash.locale : 'en'
  var format = hash.format? hash.format : 'YYYY-MM-DD HH:mm'
  var suport = hash.suport? hash.suport : 'll HH:mm'

  moment.locale(locale);

  return moment(params, format).format(suport);
}

export default helper(formatDate);
