import { helper } from '@ember/component/helper';

export default helper(function gt([left]) {
  return left ? Array.from({ length: left - 1 }, (_, i) => i + 1) : [];
});
