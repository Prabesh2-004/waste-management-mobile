import React from 'react';
import { Circle, Polyline, Text as SvgText } from 'react-native-svg';
import MapFrame from '../../../shared/components/MapFrame';
import { useTheme } from '../../../shared/theme/ThemeProvider';
import routeMap from '../../../data/driver/routeMap.json';

export default function RouteMap({ route }) {
  const colors = useTheme();
  const { points } = routeMap;
  const done = route.areasDone;
  const current = points[Math.max(done - 1, 0)];
  const allPoints = points.map((point) => point.join(',')).join(' ');
  const donePoints = points
    .slice(0, Math.max(done, 1))
    .map((point) => point.join(','))
    .join(' ');
  const flip = current[0] > 200;

  return (
    <MapFrame width={routeMap.width} height={routeMap.height} label="Route map">
      <Polyline points={allPoints} fill="none" stroke={colors.muted} strokeWidth={4} strokeDasharray="7 6" />
      <Polyline points={donePoints} fill="none" stroke={colors.green} strokeWidth={5} />
      {points.map((point, index) => (
        <React.Fragment key={index}>
          <Circle
            cx={point[0]}
            cy={point[1]}
            r={11}
            fill={index < done ? colors.green : colors.surface}
            stroke={colors.accent}
            strokeWidth={2}
          />
          <SvgText
            x={point[0]}
            y={point[1] + 4}
            textAnchor="middle"
            fontSize={12}
            fill={index < done ? colors.white : colors.ink}
          >
            {String(index + 1)}
          </SvgText>
        </React.Fragment>
      ))}
      <Circle cx={current[0]} cy={current[1] - 24} r={8} fill={colors.blue} />
      <SvgText
        x={flip ? current[0] - 12 : current[0] + 12}
        y={current[1] - 21}
        textAnchor={flip ? 'end' : 'start'}
        fontSize={12}
        fill={colors.ink}
      >
        You are here
      </SvgText>
    </MapFrame>
  );
}
