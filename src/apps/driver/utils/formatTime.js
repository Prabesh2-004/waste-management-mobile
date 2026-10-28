export function formatTime(value) {
  const [hours, minutes] = value.split(':').map(Number);
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')}${hours < 12 ? ' AM' : ' PM'}`;
}

export function addMinutes(value, extra) {
  const [hours, minutes] = value.split(':').map(Number);
  const total = hours * 60 + minutes + extra;
  return formatTime(`${Math.floor(total / 60)}:${total % 60}`);
}
