const aiResponses = [
  "That sounds amazing! Have you thought about what activities you'd like to do there?",
  "I'd love to help you plan this trip! What's your budget range?",
  "Great destination choice! When are you thinking of traveling?",
  "How many people are you planning to travel with?",
  "That's perfect for a group trip! What accommodations are you looking for?",
  "Adventure travel is the best! Have you considered travel insurance?",
  "The local food there is incredible! Do you have any dietary restrictions I should know about?",
  "I can help arrange transport options for your group. What mode of transport do you prefer?",
  "That time of year has great weather! Have you checked the visa requirements?",
  "This destination is perfect for making new friends! What's your travel style - adventure, relaxation, or cultural?",
  "Safety first! I'll help you plan emergency contacts and travel tips.",
  "Your group seems diverse! That's the best part of group travel. Any specific interests in common?",
  "Budget-friendly options are my specialty! Let me help you save on this trip.",
  "The local culture there is fascinating! Want some tips on respecting local customs?",
  "I've helped hundreds of travelers plan similar trips. Any specific concerns?",
];

export function getAIResponse(): string {
  return aiResponses[Math.floor(Math.random() * aiResponses.length)];
}

export function getAIResponseForContext(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
    return "Great question! Based on your destination and duration, I'd recommend setting a budget of $800-1500 per person. This includes accommodation, food, and activities.";
  }
  if (lowerMessage.includes('transport') || lowerMessage.includes('flight') || lowerMessage.includes('bus')) {
    return "I can help you find the best transport options! For your group size, I'd recommend booking in advance. Would you prefer budget or comfort travel?";
  }
  if (lowerMessage.includes('accommodation') || lowerMessage.includes('hotel') || lowerMessage.includes('stay')) {
    return "For accommodations, I recommend checking out guesthouses and hostels near the main attractions. They're usually 50-100% cheaper than hotels and great for meeting other travelers!";
  }
  if (lowerMessage.includes('activity') || lowerMessage.includes('what to do') || lowerMessage.includes('adventure')) {
    return "This destination has amazing activities! I'd recommend: local guided tours, water sports, cultural experiences, and food tours. What interests you most?";
  }
  if (lowerMessage.includes('safety') || lowerMessage.includes('danger') || lowerMessage.includes('safe')) {
    return "Your safety is my priority! Always travel with a buddy, keep emergency contacts handy, and stay aware of your surroundings. I'm here 24/7 if you need help!";
  }
  if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('restaurant')) {
    return "The local cuisine is incredible! I recommend street food for authentic flavors. Try the local markets for lunch - it's affordable and delicious!";
  }
  if (lowerMessage.includes('when') || lowerMessage.includes('date') || lowerMessage.includes('season')) {
    return "Timing is important! I'd recommend checking the weather patterns and local events. The shoulder seasons usually offer the best balance of weather and fewer crowds.";
  }
  if (lowerMessage.includes('group') || lowerMessage.includes('people') || lowerMessage.includes('team')) {
    return "Group travel is wonderful! My advice: establish communication channels early, discuss budgets upfront, and plan flexibility for different preferences.";
  }

  return getAIResponse();
}
