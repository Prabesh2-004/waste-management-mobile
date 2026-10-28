import React from 'react';
import { Circle, Polyline, Text as SvgText } from 'react-native-svg';
import MapFrame from '../../../shared/components/MapFrame';
import { useTheme } from '../../../shared/theme/ThemeProvider';
import truckMap from '../../../data/citizen/truckMap.json';

export default function TruckMap({ status }) {
  const colors = useTheme();
  const [truckX, truckY] = truckMap.truckPositions[status] || truckMap.defaultTruck;
  const { home, destination } = truckMap;

  return (
    <MapFrame width={truckMap.width} height={truckMap.height} label="Truck route map">
      <Polyline
        points={truckMap.path.map((point) => point.join(',')).join(' ')}
        fill="none"
        stroke={colors.muted}
        strokeWidth={5}
        strokeDasharray="8 6"
      />
      <Circle cx={home.x} cy={home.y} r={10} fill={colors.green} />
      <SvgText x={home.x + 10} y={home.y + 20} fontSize={12} fill={colors.ink}>
        {home.label}
      </SvgText>
      <SvgText x={truckX - 20} y={truckY - 18} fontSize={22}>
        🚛
      </SvgText>
      <Circle cx={destination.x} cy={destination.y} r={7} fill={colors.amber} />
      <SvgText x={destination.labelX} y={destination.labelY} fontSize={12} fill={colors.ink}>
        {destination.label}
      </SvgText>
    </MapFrame>
  );
}
