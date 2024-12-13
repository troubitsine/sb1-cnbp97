import { ChatStep } from '../types/chat';

const DONATION_STEPS: ChatStep[] = [
  'donation_amount',
  'donation_frequency',
  'name',
  'email',
  'address',
  'payment_card',
  'payment_expiry',
  'payment_cvv',
  'complete'
];

export function getNextDonationStep(currentStep: ChatStep): ChatStep {
  const currentIndex = DONATION_STEPS.indexOf(currentStep);
  return currentIndex < DONATION_STEPS.length - 1 ? DONATION_STEPS[currentIndex + 1] : 'complete';
}

export function isDonationStep(step: string): boolean {
  return DONATION_STEPS.includes(step as ChatStep) || step === 'initial';
}