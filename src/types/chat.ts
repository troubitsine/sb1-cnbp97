export type Message = {
  text: string;
  isUser: boolean;
  options?: string[];
};

export type PaymentInfo = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

export type DonorInfo = {
  name: string;
  address: string;
  amount: number;
  email: string;
  frequency: 'once' | 'monthly';
  payment?: PaymentInfo;
};

export type ChatStep = 
  | 'initial' 
  | 'chat' 
  | 'donation_amount' 
  | 'donation_frequency'
  | 'name' 
  | 'email' 
  | 'address'
  | 'payment_card'
  | 'payment_expiry'
  | 'payment_cvv'
  | 'complete';