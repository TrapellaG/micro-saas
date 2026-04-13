export type Plan = "free" | "pro" | "enterprise";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: Plan;
  status: "active" | "canceled" | "past_due";
  currentPeriodEnd: Date;
}
