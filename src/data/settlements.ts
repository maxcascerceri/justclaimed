/**
 * Settlements data and storage helpers.
 * Edit this file to change the list of settlements or how they’re loaded/saved.
 */

import type { Settlement } from '../types';

const LOGO_TOKEN = 'pk_DrKYNBAWTLqep746_gKuYA';

export function logoUrl(domain: string): string {
  if (!domain) return '';
  const clean = domain.replace(/^https?:\/\//, '').replace(/^www\./, '');
  return `https://img.logo.dev/${clean}?token=${LOGO_TOKEN}&size=256&format=png&retina=true`;
}

const STORAGE_KEY = 'justclaimed_settlements_v4';

/** Default list (used when localStorage is empty). */
const DEFAULT_SETTLEMENTS: Settlement[] = [
  {
    id: '1',
    companyName: 'Grubhub',
    companyIcon: 'GRUB',
    logoUrl: logoUrl('grubhub.com'),
    estimatedPayout: '$15+',
    deadline: 'March 4, 2026',
    badge: 'proof-required',
    category: 'consumer-goods',
    description: 'Grubhub added restaurants to its platform without permission.',
    claimUrl: 'https://www.restaurantlistingsettlement.com/Login',
    eligibility:
      'All businesses whose names or logos were used on Grubhub or any other part of the Grubhub platform, including AllMenus, Eat24, Seamless, Tapingo, LevelUp, OrderUp, MenuPages and BiteGrabber, from Jan. 1, 2019, through April 30, 2024, without a contract with Grubhub.',
    aboutText:
      'Grubhub agreed to a $7.15 million class action lawsuit settlement to resolve claims it added restaurants to its platform without permission.',
  },
  {
    id: '2',
    companyName: 'Nationwide',
    companyIcon: 'NW',
    logoUrl: logoUrl('nationwide.com'),
    estimatedPayout: 'Up to $17.50',
    deadline: 'March 11, 2026',
    badge: 'proof-required',
    category: 'finance',
    description: 'TCPA violations for unsolicited robocalls about pet insurance.',
    claimUrl: 'https://tcpapetsettlement.com/Login',
    eligibility:
      'This settlement benefits individuals who received one or more prerecorded voice messages on their telephone from Nationwide Mutual Insurance Company regarding the renewal and/or expiration of their pet insurance policy since Jan. 6, 2021.',
    aboutText:
      'Nationwide has agreed to a $1.4 million class action lawsuit settlement to resolve claims that it violated the Telephone Consumer Protection Act (TCPA) with unsolicited robocalls.',
  },
];

export function getSettlements(): Settlement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Settlement[];
  } catch {
    // ignore
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTLEMENTS));
  return DEFAULT_SETTLEMENTS;
}

export function saveSettlements(list: Settlement[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function addSettlement(s: Settlement): void {
  saveSettlements([...getSettlements(), s]);
}

export function updateSettlement(id: string, updates: Partial<Settlement>): void {
  saveSettlements(
    getSettlements().map((s) => (s.id === id ? { ...s, ...updates } : s))
  );
}

export function deleteSettlement(id: string): void {
  saveSettlements(getSettlements().filter((s) => s.id !== id));
}
