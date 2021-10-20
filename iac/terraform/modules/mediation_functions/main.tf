resource "azurerm_resource_group" "main" {
  name     = "rg-${var.identifier}"
  location = var.location
}

resource "azurerm_storage_account" "func" {
  name                     = format("st%s", replace(var.identifier, "-", ""))
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = var.storage.tier
  account_replication_type = var.storage.replication_type
}

resource "azurerm_app_service_plan" "main" {
  name                = "plan-${var.identifier}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  kind                = "FunctionApp"

  sku {
    tier = var.app_service_plan.tier
    size = var.app_service_plan.size
  }
}

resource "azurerm_application_insights" "main" {
  name                = "appi-${var.identifier}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  application_type    = "Node.JS"
  tags                = {}
}

resource "azurerm_function_app" "main" {
  name                       = "func-${var.identifier}"
  location                   = azurerm_resource_group.main.location
  resource_group_name        = azurerm_resource_group.main.name
  app_service_plan_id        = azurerm_app_service_plan.main.id
  storage_account_name       = azurerm_storage_account.func.name
  storage_account_access_key = azurerm_storage_account.func.primary_access_key
  version                    = "~3"

  app_settings = {
    "APPINSIGHTS_INSTRUMENTATIONKEY" = azurerm_application_insights.main.instrumentation_key
    "FUNCTIONS_WORKER_RUNTIME"       = "node"
    "WEBSITE_NODE_DEFAULT_VERSION"   = "~14"
    "slackWebhookUrl"                = var.slack_webhook_url
  }
}
