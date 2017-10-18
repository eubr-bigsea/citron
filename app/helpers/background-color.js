import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function backgroundColor(params/*, hash*/) {
  return htmlSafe(`background: ${params[0]}`);
}

export default helper(backgroundColor);
