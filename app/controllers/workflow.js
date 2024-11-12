import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WorkflowController extends Controller {

  dummyConditionNode = {
    "type": "DmConditionNode",
    "id": 89,
    "conditions": [
      {
        "columnID": 3009991204498,
        "operator": 119,
        "type": "oneValue_v1",
        "values": [
          {
            "displayValue": "",
            "numericValue": null
          }
        ]
      }
    ],
    "logicalOperator": 0,
    "childNode": {
      "action": {
        "type": "DmEmailRecipient_v1",
        "notificationCustomizationJson": "{\"version\":\"1\",\"fromCustomization\":{\"fromType\":\"AUTOMATION\"}}",
        "notificationCustomizationJsonSanitized": "{\"version\":\"1\",\"fromCustomization\":{\"fromType\":\"AUTOMATION\"}}",
        "includeAttachments": true,
        "includeComments": true,
        "includeMessageOnly": false,
        "readOnlyRecipients": false,
        "recipients": [
          {
            "id": 147239951,
            "email": "bhaskar.das9476@gmail.com",
            "type": 2
          }
        ]
      },
      "id": null,
      "type": "DmGeneralActionNode"
    }
  };

  @tracked isLoaded = false;
  @tracked fdata = {};

  constructor() {
    super();
    this.fetchData();
  }
  
  async fetchData() {
    let response = await fetch('./data.json');
    this.fdata = await response.json();
    this.isLoaded = true;
  }

  @action
  addNode(id, event) {
    event.preventDefault();
    let data = this.fdata;
    function addDummyConditionNodeById(node, targetId) {
        // Check if the current node's childNode has the target ID
        if (node.id === targetId) {
            const dummyConditionNode = {
                "type": "DmConditionNode",
                "id": null,  // Dummy ID, set as needed
                "conditions": [
                    {
                        "columnID": 3009991204498,
                        "operator": 119,
                        "type": "dummyType",
                        "values": [
                            {
                                "displayValue": "Dummy Value",
                                "numericValue": null
                            }
                        ]
                    }
                ],
                "logicalOperator": 0
            };
    
            // Ensure childNode and conditionNodes array exist
            if (!node.childNode) {
                node.childNode = { type: "DmIfElseNode", id: null, conditionNodes: [] };
            } else if (!node.childNode.conditionNodes) {
                node.childNode.conditionNodes = [];
            }
    
            // Push the dummy condition node to conditionNodes array
            node.childNode.conditionNodes.push(dummyConditionNode);
            console.log("Dummy condition node added to node ID:", targetId);
            return true; // Return true to indicate the node was found and modified
        }
    
        // Recursively search within conditionNodes if they exist
        if (node.conditionNodes) {
            for (const childNode of node.conditionNodes) {
                if (addDummyConditionNodeById(childNode, targetId)) {
                    return true;
                }
            }
        }
    
        // Recursively search within childNode if it exists
        if (node.childNode) {
            if (addDummyConditionNodeById(node.childNode, targetId)) {
                return true;
            }
        }
    
        // Check the elseNode if it exists
        if (node.elseNode && node.elseNode.childNode) {
            return addDummyConditionNodeById(node.elseNode.childNode, targetId);
        }
    
        return false; // Node with target ID not found in this branch
    }
    addDummyConditionNodeById(data.rootNode, id);

    console.log("Updated data:", id,  data);
  }
}
