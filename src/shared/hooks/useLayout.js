import { useWindowDimensions } from 'react-native';

export const FRAME_MAX_WIDTH = 430;

export default function useLayout() {
  const { width, height } = useWindowDimensions();
  const frameWidth = Math.min(width, FRAME_MAX_WIDTH);
  const scale = Math.min(1, Math.max(0.88, frameWidth / 390));
  return { width, height, frameWidth, scale };
}
