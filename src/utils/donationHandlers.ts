import { DonorInfo } from '../types/chat';
import { donationOptions } from './donationOptions';

type DonationAmountResult = {
  success: boolean;
  nextStep: 'donation_frequency' | 'name';
  message: string;
  options?: string[];
};

export function handleDonationAmount(
  input: string,
  setDonorInfo: React.Dispatch<React.SetStateAction<DonorInfo>>
): DonationAmountResult {
  const preset = donationOptions.preset.find(opt => opt.label === input);
  
  if (input === "Other amount") {
    return {
      success: true,
      nextStep: 'donation_frequency',
      message: "Please enter your desired donation amount:"
    };
  }
  
  if (preset && 'amount' in preset) {
    setDonorInfo(prev => ({
      ...prev,
      amount: preset.amount,
      frequency: preset.frequency
    }));
    return {
      success: true,
      nextStep: 'name',
      message: "Thank you for choosing to donate! Could you please provide your name?"
    };
  }
  
  // Handle custom amount
  const amount = Number(input.replace(/[^0-9.]/g, ''));
  if (!isNaN(amount) && amount > 0) {
    setDonorInfo(prev => ({ ...prev, amount }));
    return {
      success: true,
      nextStep: 'donation_frequency',
      message: "Would you like to make this a monthly or one-time donation?",
      options: ["Monthly donation", "One-time donation"]
    };
  }
  
  return {
    success: false,
    nextStep: 'donation_amount',
    message: "Please enter a valid donation amount:"
  };
}