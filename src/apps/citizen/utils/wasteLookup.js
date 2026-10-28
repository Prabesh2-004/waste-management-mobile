import wasteItems from '../../../data/citizen/wasteItems.json';

export function findWasteItem(text) {
  const query = String(text).toLowerCase();
  return wasteItems.find((item) => item.keywords.some((keyword) => query.includes(keyword))) || null;
}

export function sampleWasteItem(index) {
  return wasteItems[index % 4];
}
