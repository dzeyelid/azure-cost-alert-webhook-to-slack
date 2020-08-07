import { CostAlertNotificationData } from './CostAlertNotificationData'

export interface CostAlertNotificationDto {
  schemaId: string;
  data: {
    SubscriptionName: string;
    SubscriptionId: string;
    EnrollmentNumber?: string;
    DepartmentName?: string;
    AccountName?: string;
    BillingAccountId?: string;
    BillingProfileId?: string;
    InvoiceSectionId?: string;
    ResourceGroup: string;
    SpendingAmount: string;
    BudgetStartDate: string;
    Budget: string;
    Unit: string;
    BudgetCreator: string;
    BudgetName: string;
    BudgetType: "Cost" | "Usage";
    NotificationThresholdAmount: string;
  };
}
