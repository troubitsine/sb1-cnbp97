import { ChatStep, DonorInfo } from '../types/chat';
import { handleDonationStep } from './donationFlow';
import { getNextDonationStep } from './donationSteps';

type DonationInputResult = {
  nextStep: ChatStep;
  response: {
    text: string;
    options?: string[];
  };
};

export function handleDonationInput(
  currentStep: ChatStep,
  input: string,
  donorInfo: DonorInfo
): DonationInputResult {
  const nextStep = getNextDonationStep(currentStep);
  const response = handleDonationStep(nextStep, input, donorInfo);

  return {
    nextStep,
    response
  };
}