# azure-cost-alert-webhook-to-slack

## How to deploy the mediation functions

```ps1
$MEDIATION_FUNCTIONS_RESOURCE_GROUP='<Resource group name for function to mediate>'
$MEDIATION_FUNCTIONS_LOCATION='japaneast'
$MEDIATION_FUNCTIONS_IDENTIFIER='<String to identify the resources>'
$MEDIATION_FUNCTIONS_SLACK_WEBHOOK_URL='<Slack webhook url>'

az group create `
  --name ${MEDIATION_FUNCTIONS_RESOURCE_GROUP} `
  --location ${MEDIATION_FUNCTIONS_LOCATION}

az deployment group create `
  --confirm-with-what-if `
  --resource-group ${MEDIATION_FUNCTIONS_RESOURCE_GROUP} `
  --name deployMediationFunctions `
  --template-file ./iac/deploy-mediation-functions/deploy-mediation-functions.json `
  --parameters `
    identifier=${MEDIATION_FUNCTIONS_IDENTIFIER} `
    slackWebhookUrl=${MEDIATION_FUNCTIONS_SLACK_WEBHOOK_URL}

cd functions
npm build
func azure functionapp publish func-${MEDIATION_FUNCITONS_IDENTIFIER}
```