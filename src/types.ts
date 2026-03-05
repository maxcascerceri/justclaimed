/**
 * Shared types for JustClaimed.
 * Used by Dashboard, Admin, PaywallModal, and data layer.
 */

export type BadgeType = 'no-proof' | 'proof-required';

export type SettlementCategory =
  | 'tech'
  | 'finance'
  | 'consumer-goods'
  | 'other';

export interface Settlement {
  id: string;
  companyName: string;
  companyIcon: string;
  logoUrl: string;
  estimatedPayout: string;
  deadline: string;
  badge: BadgeType;
  category: SettlementCategory;
  description: string;
  claimUrl: string;
  eligibility?: string;
  aboutText?: string;
}
