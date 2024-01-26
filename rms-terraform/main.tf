terraform {
required_providers {
azurerm = {
source = "hashicorp/azurerm"
}
}
}
provider "azurerm" {
features {}
}
resource "azurerm_resource_group" "dvopsResourceGroup" {
name = "dvopsResourceGroup"
location = "East US"
}
resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" {
name = "dvopsAKSCluster"
location = azurerm_resource_group.dvopsResourceGroup.location
resource_group_name = azurerm_resource_group.dvopsResourceGroup.name
dns_prefix = "rms-aks"
default_node_pool {
name = "default"
node_count = 1
vm_size = "Standard_DS2_v2"
}
service_principal {
client_id = "97694f38-db4d-49ea-8a7c-2c8b33f88cf5"
client_secret = "dNa8Q~4H49kNZZ~Gh_t2KYLUU9q1jsup8jeWMcir"
}
}