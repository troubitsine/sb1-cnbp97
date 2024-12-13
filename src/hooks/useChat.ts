import { useState, useCallback } from 'react';
import { Message, DonorInfo, ChatStep } from '../types/chat';
import { generateResponse } from '../utils/chatResponses';
import { analyzeUserIntent } from '../utils/chatUtils';
import { handleDonationStep } from '../utils/donationFlow';
import { handleDonationAmount } from '../utils/donationHandlers';
import { getNextDonationStep } from '../utils/donationSteps';
import { INITIAL_MESSAGES, INITIAL_DONOR_INFO } from '../utils/constants';
import { handlePaymentInput } from '../utils/paymentHandler';
import { handleOptionSelection } from '../utils/optionHandler';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [currentStep, setCurrentStep] = useState<ChatStep>('initial');
  const [donorInfo, setDonorInfo] = useState<DonorInfo>(INITIAL_DONOR_INFO);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handleUserInput = useCallback((input: string) => {
    addMessage({ text: input, isUser: true });

    if (currentStep === 'initial') {
      const response = analyzeUserIntent(input);
      addMessage({
        text: response.text,
        isUser: false,
        options: response.options
      });
      return;
    }

    // Handle payment steps
    if (currentStep.startsWith('payment_')) {
      const { nextStep, response, updatedDonorInfo } = handlePaymentInput(currentStep, input, donorInfo);
      setCurrentStep(nextStep);
      setDonorInfo(updatedDonorInfo);
      addMessage({
        text: response.text,
        isUser: false,
        options: response.options
      });
      return;
    }

    // Handle donation steps
    if (currentStep.startsWith('donation_') || ['name', 'email', 'address'].includes(currentStep)) {
      if (currentStep === 'name') {
        setDonorInfo(prev => ({ ...prev, name: input }));
        setCurrentStep('email');
        addMessage({
          text: `Thank you ${input}! What's your email address? We'll send you a tax receipt for your donation.`,
          isUser: false
        });
        return;
      }

      if (currentStep === 'email') {
        setDonorInfo(prev => ({ ...prev, email: input }));
        setCurrentStep('address');
        addMessage({
          text: "Please provide your address for the tax receipt:",
          isUser: false
        });
        return;
      }

      if (currentStep === 'address') {
        setDonorInfo(prev => ({ ...prev, address: input }));
        setCurrentStep('payment_card');
        addMessage({
          text: "Great! Now for the payment details (This is a prototype - please don't enter real card information)\n\nPlease enter a card number:",
          isUser: false
        });
        return;
      }

      const { nextStep, response } = handleDonationInput(currentStep, input, donorInfo);
      setDonorInfo(prev => ({ ...prev, [currentStep.replace('donation_', '')]: input }));
      setCurrentStep(nextStep);
      addMessage({
        text: response.text,
        isUser: false,
        options: response.options
      });
      return;
    }

    const response = generateResponse(input);
    addMessage({
      text: response.text,
      isUser: false,
      options: response.options
    });
  }, [currentStep, donorInfo, addMessage]);

  const handleOptionClick = useCallback((option: string) => {
    const { nextStep, response, updatedDonorInfo } = handleOptionSelection(option, currentStep, donorInfo);
    
    addMessage({ text: option, isUser: true });
    
    if (updatedDonorInfo) {
      setDonorInfo(updatedDonorInfo);
    }
    
    if (nextStep) {
      setCurrentStep(nextStep);
    }
    
    addMessage({
      text: response.text,
      isUser: false,
      options: response.options
    });
  }, [currentStep, donorInfo, addMessage]);

  return {
    messages,
    currentStep,
    donorInfo,
    handleUserInput,
    handleOptionClick
  };
}