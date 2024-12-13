import { knowledgeBase } from './chatKnowledge';
import { statistics } from './knowledge/statistics';
import { impact } from './knowledge/impact';
import { operations } from './knowledge/operations';

export type ChatResponse = {
  text: string;
  options?: string[];
};

export function generateResponse(input: string): ChatResponse {
  const lowercaseInput = input.toLowerCase();

  // Learn about Ottawa Food Bank
  if (input === "Learn about Ottawa Food Bank") {
    return {
      text: `${knowledgeBase.foodBank.mission} We serve over ${statistics.foodDistribution.amount} ${statistics.foodDistribution.unit} of food ${statistics.foodDistribution.frequency}. Would you like to learn more about our specific programs or impact?`,
      options: ["Our Programs", "Our Impact", "How to Help"]
    };
  }

  // Learn about donation impact
  if (input === "Learn about donation impact") {
    return {
      text: `${impact.donationValue.description} Would you like to see specific examples of how your donation can help?`,
      options: ["Donation Examples", "Make a Donation", "Other Ways to Help"]
    };
  }

  // Our Programs
  if (input === "Our Programs") {
    return {
      text: `We run several essential programs through our ${impact.reach.agencies} member agencies across Ottawa, including ${knowledgeBase.foodBank.programs.join(", ")}. Which program would you like to learn more about?`,
      options: knowledgeBase.foodBank.programs
    };
  }

  // Our Impact
  if (input === "Our Impact") {
    return {
      text: `Every year, we grow and distribute ${statistics.produce.amount} ${statistics.produce.unit} of fresh produce, maintain ${statistics.donationBins.count} donation bins across Ottawa, and engage volunteers for ${statistics.volunteerHours.amount} hours. Would you like to learn more about a specific aspect?`,
      options: ["Volunteer Impact", "Distribution Network", "Make a Difference"]
    };
  }

  // How to Help
  if (input === "How to Help") {
    return {
      text: "There are many ways you can support our mission. You can donate funds, organize food drives, volunteer your time, or become a corporate partner. What interests you most?",
      options: knowledgeBase.donation.methods
    };
  }

  // Donation Examples
  if (input === "Donation Examples") {
    const examples = impact.donationValue.examples;
    return {
      text: `Here's how your donation helps:\n$${Object.entries(examples).map(([amount, impact]) => `\n• $${amount}: ${impact}`).join("")}\n\nWould you like to make a donation?`,
      options: ["Donate now", "Learn more", "Other ways to help"]
    };
  }

  // Default response for unhandled inputs
  return {
    text: "Thank you for your interest! Would you like to learn more about our programs, see the impact of donations, or find ways to help?",
    options: [
      "Learn about our programs",
      "See donation impact",
      "Ways to help"
    ]
  };
}