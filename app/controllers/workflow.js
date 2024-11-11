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
    console.log('aaa', id);
  }
}
