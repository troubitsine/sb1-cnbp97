import { ChatStep, DonorInfo } from '../types/chat';
import { handleDonationAmount } from './donationHandlers';
import { handleDonationStep } from './donationFlow';
import { donationOptions } from './donationOptions';

type OptionResponse = {
  nextStep?: ChatStep;
  response: {
    text: string;
    options?: string[];
  };
  updatedDonorInfo?: DonorInfo;
};

export function handleOptionSelection(
  option: string,
  currentStep: ChatStep,
  donorInfo: DonorInfo
): OptionResponse {
  // Handle donation-specific options
  if (option === "Donate now" || option === "Make a Donation" || option === "Make another donation") {
    const response = handleDonationStep('donation_amount', '', donorInfo);
    return {
      nextStep: 'donation_amount',
      response,
      updatedDonorInfo: option === "Make another donation" ? {
        name: '',
        address: '',
        amount: 0,
        email: '',
        frequency: 'once',
        payment: {
          cardNumber: '',
          expiryDate: '',
          cvv: ''
        }
      } : donorInfo
    };
  }

  // Handle donation amount selection
  if (currentStep === 'donation_amount') {
    const preset = donationOptions.preset.find(opt => opt.label === option);
    
    if (preset && 'amount' in preset) {
      return {
        nextStep: 'name',
        response: {
          text: "Thank you for choosing to donate! Could you please provide your name?"
        },
        updatedDonorInfo: {
          ...donorInfo,
          amount: preset.amount,
          frequency: preset.frequency
        }
      };
    }
    
    if (option === "Other amount") {
      return {
        nextStep: 'donation_amount',
        response: {
          text: "Please enter your desired donation amount:"
        }
      };
    }
  }

  // Handle frequency selection
  if (currentStep === 'donation_frequency') {
    const frequency = option.toLowerCase().includes('monthly') ? 'monthly' : 'once';
    return {
      nextStep: 'name',
      response: {
        text: "Thank you for choosing to donate! Could you please provide your name?"
      },
      updatedDonorInfo: {
        ...donorInfo,
        frequency
      }
    };
  }

  // Handle general options
  const response = handleDonationStep(currentStep, option, donorInfo);
  return {
    response
  };
}