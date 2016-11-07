import Ember from 'ember';

export function backgroundColor(params/*, hash*/) {
  return Ember.String.htmlSafe(`background: ${params[0]}`);
}

export default Ember.Helper.helper(backgroundColor);
