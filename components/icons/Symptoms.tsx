import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
}

const Symptoms: React.FC<IconProps> = ({ color = '#000', size = 28 }) => {
  const width = size * (20 / 24);
  return (
    <Svg width={width} height={size} viewBox="0 0 20 24" fill="none">
      <Path
        d="M0,0h20v24h-20zM18.333,22.5v-21h-16.666v21zM10,6v1.5h-6.667v-1.5zM10,12v1.5h-6.667v-1.5zM10,18v1.5h-6.667v-1.5zM16.419,5.027l-3.086,2.778l-2.252,-2.028l1.172,-1.054l1.08,0.972l1.914,-1.722zM16.419,11.027l-3.086,2.778l-2.252,-2.028l1.172,-1.054l1.08,0.972l1.914,-1.722zM16.419,17.027l-3.086,2.778l-2.252,-2.028l1.172,-1.054l1.08,0.972l1.914,-1.722z"
        fill={color}
      />
    </Svg>
  );
};

export default Symptoms;
