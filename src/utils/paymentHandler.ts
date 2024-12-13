import { ChatStep, DonorInfo } from '../types/chat';
import { getNextDonationStep } from './donationSteps';
import { impact } from './knowledge/impact';

type PaymentResponse = {
  nextStep: ChatStep;
  response: {
    text: string;
    options?: string[];
  };
  updatedDonorInfo: DonorInfo;
};

export function handlePaymentInput(
  currentStep: ChatStep,
  input: string,
  donorInfo: DonorInfo
): PaymentResponse {
  const nextStep = getNextDonationStep(currentStep);
  let updatedDonorInfo = { ...donorInfo };

  switch (currentStep) {
    case 'payment_card':
      updatedDonorInfo.payment = {
        ...updatedDonorInfo.payment,
        cardNumber: input
      };
      return {
        nextStep,
        response: {
          text: "Please enter the card expiry date (MM/YY):"
        },
        updatedDonorInfo
      };

    case 'payment_expiry':
      updatedDonorInfo.payment = {
        ...updatedDonorInfo.payment,
        expiryDate: input
      };
      return {
        nextStep,
        response: {
          text: "Please enter the CVV (3 digits on back of card):"
        },
        updatedDonorInfo
      };

    case 'payment_cvv':
      updatedDonorInfo.payment = {
        ...updatedDonorInfo.payment,
        cvv: input
      };
      const frequencyText = donorInfo.frequency === 'monthly' ? 'monthly ' : '';
      const impactAmount = donorInfo.amount * impact.donationValue.multiplier;
      return {
        nextStep: 'complete',
        response: {
          text: `Thank you so much ${donorInfo.name}! Your generous ${frequencyText}donation of $${donorInfo.amount} will help us provide $${impactAmount} worth of food to families in need.\n\nWe'll email your tax receipt to ${donorInfo.email}. Would you like to make another donation or learn about other ways to help?`,
          options: ["Make another donation", "Other ways to contribute", "Back to start"]
        },
        updatedDonorInfo
      };

    default:
      return {
        nextStep: currentStep,
        response: {
          text: "I'm sorry, there was an error processing your payment information. Please try again.",
        },
        updatedDonorInfo
      };
  }
}