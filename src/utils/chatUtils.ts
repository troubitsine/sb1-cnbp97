import { statistics } from './knowledge/statistics';
import { operations } from './knowledge/operations';
import { impact } from './knowledge/impact';

type ChatResponse = {
  text: string;
  options?: string[];
};

export function analyzeUserIntent(input: string): ChatResponse {
  const lowercaseInput = input.toLowerCase();
  
  // Friend referral
  if (lowercaseInput.includes('friend') || lowercaseInput.includes('referred')) {
    return {
      text: "That's wonderful that your friend told you about us! Word of mouth from caring community members like your friend helps us reach more people in need. Would you like to learn about the impact your support could have?",
      options: [
        "Show me the impact",
        "How can I help?",
        "Tell me more about the food bank"
      ]
    };
  }

  // Saw news or social media
  if (lowercaseInput.includes('news') || lowercaseInput.includes('social') || lowercaseInput.includes('facebook') || lowercaseInput.includes('instagram')) {
    return {
      text: "We're glad you found us through the media! Our community's needs have been growing, and we're working hard to meet them. Would you like to learn more about our current initiatives?",
      options: [
        "Current initiatives",
        "Impact of donations",
        "Ways to help"
      ]
    };
  }

  // Want to help/volunteer
  if (lowercaseInput.includes('help') || lowercaseInput.includes('volunteer')) {
    return {
      text: `We're always grateful for people wanting to help! Did you know we have over ${statistics.volunteerHours.amount} volunteer hours ${statistics.volunteerHours.period}? There are many ways you can make a difference.`,
      options: [
        "Volunteer opportunities",
        "Make a donation",
        "Learn more"
      ]
    };
  }

  // Looking for help
  if (lowercaseInput.includes('need') || lowercaseInput.includes('food') || lowercaseInput.includes('assistance')) {
    return {
      text: "We're here to help. Through our network of over 140 member agencies, we provide food assistance across Ottawa. Would you like to learn about our programs or find the nearest location?",
      options: [
        "Find nearest location",
        "Learn about programs",
        "Emergency assistance"
      ]
    };
  }

  // Curious/browsing
  if (lowercaseInput.includes('looking') || lowercaseInput.includes('curious') || lowercaseInput.includes('browsing')) {
    return {
      text: "Welcome! We're happy you're interested in learning more about the Ottawa Food Bank. Did you know that every dollar donated becomes $5 worth of food through our partnerships? What would you like to know more about?",
      options: [
        "Our impact",
        "How we work",
        "Ways to contribute"
      ]
    };
  }

  // Default personalized response
  return {
    text: "Thank you for your interest in the Ottawa Food Bank! We're making a real difference in our community, distributing 14 tons of food each day to those in need. What aspect of our work would you like to learn more about?",
    options: [
      "Our programs",
      "Donation impact",
      "Get involved"
    ]
  };
}

export function generateResponse(input: string): ChatResponse {
  // ... (rest of the existing generateResponse function remains the same)
}