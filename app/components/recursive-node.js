import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RecursiveNode extends Component {
  get findMaxNode() {
    function getMaxConditionNodesLength({ childNode }) {
      let node = childNode;
      // Base case: if node doesn't have conditionNodes, return 0
      if (!node || !node.conditionNodes) {
        return 0;
      }

      // Check the length of the current node's conditionNodes
      let maxLength = node.conditionNodes.length;

      // Recursively check each child node for their conditionNodes length
      for (const childNode of node.conditionNodes) {
        maxLength = Math.max(maxLength, getMaxConditionNodesLength(childNode));
      }

      return maxLength;
    }

    if (this.args.node.childNode.conditionNodes) {
      let figure = this.args.node.childNode.conditionNodes.map(
        getMaxConditionNodesLength,
      );
      figure.splice(-1);
      return figure;
    } else return [0];
  }
}
