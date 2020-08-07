import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from 'axios'
import { CostAlertNotificationDto } from '../core/interfaces/CostAlertNotificationDto'
import { CostAlertNotification } from '../core/interfaces/CostAlertNotification'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.');
  const rawAlert = req.body as CostAlertNotificationDto;
  const alert = convertToCostAlertNotificattion(rawAlert);
  const percentage = Math.round((alert.data.NotificationThresholdAmount / alert.data.Budget) * 100);
  const body = {
    text: alert.schemaId,
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `:loudspeaker: リソースグループ \`${alert.data.ResourceGroup}\` の利用が予算の ${percentage}% を超えました！\nコストの見直しを行ってください。`,
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `*リソースグループ*:\t${alert.data.ResourceGroup}\n*現在のコスト*:\t\t\t${alert.data.SpendingAmount}\n*予算*:\t\t\t\t\t\t\t${alert.data.Budget}\n*通貨*:\t\t\t\t\t\t\t${alert.data.Unit}`,
        }
      }
    ]
  };
  const result = await axios.post(process.env.slackWebhookUrl, body);
  context.done();
};

function convertToCostAlertNotificattion(rawAlert: CostAlertNotificationDto): CostAlertNotification {
  const costAlertNotification: CostAlertNotification = {
    ...rawAlert,
    data: {
      ...rawAlert.data,
      SpendingAmount: parseFloat(rawAlert.data.SpendingAmount),
      Budget: parseFloat(rawAlert.data.Budget),
      NotificationThresholdAmount: parseFloat(rawAlert.data.NotificationThresholdAmount),
    }
  };
  return costAlertNotification;
}

export default httpTrigger;
