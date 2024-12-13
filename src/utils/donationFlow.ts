import { DonorInfo } from '../types/chat';
import { impact } from './knowledge/impact';
import { donationOptions } from './donationOptions';

export type DonationStep = {
  text: string;
  options?: string[];
};

export function handleDonationStep(step: string, input: string, donorInfo: DonorInfo): DonationStep {
  switch (step) {
    case 'donation_amount':
      const presetOptions = donationOptions.preset.map(opt => opt.label);
      return {
        text: "How would you like to help? Choose an amount or enter your own:",
        options: presetOptions
      };

    case 'donation_frequency':
      return {
        text: "Would you like to make this a monthly or one-time donation?",
        options: ["Monthly donation", "One-time donation"]
      };

    case 'name':
      return {
        text: "Thank you for choosing to donate! Could you please provide your name?",
      };
    
    case 'email':
      return {
        text: `Thank you ${input}! What's your email address? We'll send you a tax receipt for your donation.`,
      };
    
    case 'address':
      return {
        text: "Please provide your address for the tax receipt:",
      };
    
    case 'payment_card':
      return {
        text: "Great! Now for the payment details (This is a prototype - please don't enter real card information)\n\nPlease enter a card number:",
      };

    case 'payment_expiry':
      return {
        text: "Please enter the card expiry date (MM/YY):",
      };

    case 'payment_cvv':
      return {
        text: "Please enter the CVV (3 digits on back of card):",
      };

    case 'complete':
      const frequencyText = donorInfo.frequency === 'monthly' ? 'monthly ' : '';
      const impactAmount = donorInfo.amount * impact.donationValue.multiplier;
      return {
        text: `Thank you so much ${donorInfo.name}! Your generous ${frequencyText}donation of $${donorInfo.amount} will help us provide $${impactAmount} worth of food to families in need.\n\nWe'll email your tax receipt to ${donorInfo.email}. Would you like to make another donation or learn about other ways to help?`,
        options: ["Make another donation", "Other ways to contribute", "Back to start"]
      };
    
    default:
      return {
        text: "How would you like to help? Choose an amount or enter your own:",
        options: donationOptions.preset.map(opt => opt.label)
      };
  }
}