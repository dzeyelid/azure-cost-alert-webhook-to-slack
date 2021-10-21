# azure-cost-alert-webhook-to-slack

## How to deploy resources

### Using Terraform

```bash
cd iac/terraform

MEDIATION_FUNCTIONS_IDENTIFIER="slack-mediation-func"
MEDIATION_FUNCTIONS_SLACK_WEBHOOK_URL="<Slack webhook url>"

cat .auto.tfvars.example.json | jq ".identifier=\"${MEDIATION_FUNCTIONS_IDENTIFIER}\" | .slack_webhook_url=\"${MEDIATION_FUNCTIONS_SLACK_WEBHOOK_URL}\"" > .auto.tfvars.json

terraform init
terraform plan
terraform apply

# If you destroy these resources
terraform destroy
```

### Using ARM template
```ps1
cd iac/arm-template

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
  --template-file ./iac/arm-template/deploy-mediation-functions.json `
  --parameters `
    identifier=${MEDIATION_FUNCTIONS_IDENTIFIER} `
    slackWebhookUrl=${MEDIATION_FUNCTIONS_SLACK_WEBHOOK_URL}
```

## How to deploy the mediation functions

```bash
cd functions
npm run build
func azure functionapp publish func-${MEDIATION_FUNCTIONS_IDENTIFIER}
```

## How to zip

```bash
cd functions
npm install
npm run build
npm prune --production
zip -r functions.zip \
  dist \
  node_modules \
  host.json \
  package.json \
  proxies.json \
  **/function.json
```