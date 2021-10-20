terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "2.81.0"
    }
  }
}

provider "azurerm" {
  features {}
}

module "mediation_functions" {
  source = "./modules/mediation_functions"

  identifier        = var.identifier
  slack_webhook_url = var.slack_webhook_url
}
