import statuses from '../../../data/citizen/statuses.json';
import schedule from '../../../data/citizen/schedule.json';
import messages from '../../../data/citizen/messages.json';
import { findWasteItem } from './wasteLookup';

export default function buildReply(text, status, timeSlot) {
  const lower = text.toLowerCase();

  if (/when|time|schedule/.test(lower) && /collect/.test(lower)) {
    return `Organic waste is collected ${timeSlot}. Inorganic is ${schedule.inorganicSlot}. Right now: ${statuses[status].label}.`;
  }
  if (/delay|late|why/.test(lower)) {
    return status === 'Delayed' ? messages.replies.delayed : messages.replies.notDelayed;
  }
  if (/what is organic|organic waste/.test(lower)) {
    return messages.replies.organic;
  }
  const item = findWasteItem(lower);
  return item ? `${item.name} is ${item.category}. ${item.action}` : messages.replies.unknown;
}
