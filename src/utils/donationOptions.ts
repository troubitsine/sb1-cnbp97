export const donationOptions = {
  preset: [
    { amount: 20, frequency: 'once', label: '$20 once' },
    { amount: 40, frequency: 'once', label: '$40 once' },
    { amount: 10, frequency: 'monthly', label: '$10 monthly' },
    { amount: 20, frequency: 'monthly', label: '$20 monthly' },
    { label: 'Other amount' }
  ],
  impactMessages: {
    once: {
      20: "provides fresh produce for 4 families for a week",
      40: "supplies complete meals for 8 families",
      10: "helps stock emergency food boxes",
    },
    monthly: {
      10: "provides ongoing support for a family throughout the year",
      20: "helps maintain our fresh food program monthly",
    }
  }
};