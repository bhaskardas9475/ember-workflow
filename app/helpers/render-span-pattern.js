import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export default helper(function renderSpanPattern([number]) {
  let spans = '';

  // Add "straight" spans based on the value
  for (let i = 1; i < number; i++) {
    spans += `<div class="multiSegment">
            <div class="multiHorizontalLine"></div>
          </div>`;
  }

  // Add the final "down" span
  spans += `<div class="multiSegment">
        <div class="multiHorizontalLine"></div>
        <div class="multiLowerLine"></div>
        <div class="arrowTip"></div>
      </div>`;

  return htmlSafe(spans);
});
