variable "identifier" {
  type = string
}

variable "location" {
  type    = string
  default = "japaneast"
}

variable "storage" {
  type = object({
    tier             = string
    replication_type = string
  })
  default = {
    tier             = "Standard"
    replication_type = "LRS"
  }
}

variable "app_service_plan" {
  type = object({
    tier = string
    size = string
  })
  default = {
    tier = "Dynamic"
    size = "Y1"
  }
}

variable "slack_webhook_url" {
  type = string
}
