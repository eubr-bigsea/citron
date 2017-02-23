/*global moment*/

import Ember from 'ember';

export function formatDate(params, namedArgs) {
  return moment(params, "YYYY-MM-DD HH:mm").locale(namedArgs.locale).format('ll HH:mm');
}

export default Ember.Helper.helper(formatDate);
