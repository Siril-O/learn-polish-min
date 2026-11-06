import { historyBackgroundEarly } from './history-background-early.js';
import { historyBackgroundModern } from './history-background-modern.js';
import { historyBackgroundPeople } from './history-background-people.js';
import { historyBackgroundCulture } from './history-background-culture.js';

export const historyBackground = {
  ...historyBackgroundEarly,
  ...historyBackgroundModern,
  ...historyBackgroundPeople,
  ...historyBackgroundCulture,
};
