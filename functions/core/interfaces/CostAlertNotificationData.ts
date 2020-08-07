export interface CostAlertNotificationData {
  SubscriptionName: string;
  SubscriptionId: string;
  EnrollmentNumber?: string;
  DepartmentName?: string;
  AccountName?: string;
  BillingAccountId?: string;
  BillingProfileId?: string;
  InvoiceSectionId?: string;
  ResourceGroup: string;
  SpendingAmount: number;
  BudgetStartDate: string;
  Budget: number;
  Unit: string;
  BudgetCreator: string;
  BudgetName: string;
  BudgetType: "Cost" | "Usage";
  NotificationThresholdAmount: number;
}