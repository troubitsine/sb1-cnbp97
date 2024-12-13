import { Message, DonorInfo } from '../types/chat';

export const INITIAL_MESSAGES: Message[] = [{
  text: "Welcome to the Ottawa Food Bank! What brings you here today?",
  isUser: false,
  options: [
    "Learn about Ottawa Food Bank",
    "Learn about donation impact",
    "Donate now"
  ]
}];

export const INITIAL_DONOR_INFO: DonorInfo = {
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
};