import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
}

const More: React.FC<IconProps> = ({ color = '#000', size = 28 }) => {
  const height = size * (6 / 24);
  return (
    <Svg width={size} height={height} viewBox="0 0 24 6" fill="none">
      <Path
        d="M3,0c-1.65,0 -3,1.35 -3,3c0,1.65 1.35,3 3,3c1.65,0 3,-1.35 3,-3c0,-1.65 -1.35,-3 -3,-3zM21,0c-1.65,0 -3,1.35 -3,3c0,1.65 1.35,3 3,3c1.65,0 3,-1.35 3,-3c0,-1.65 -1.35,-3 -3,-3zM12,0c-1.65,0 -3,1.35 -3,3c0,1.65 1.35,3 3,3c1.65,0 3,-1.35 3,-3c0,-1.65 -1.35,-3 -3,-3z"
        fill={color}
      />
    </Svg>
  );
};

export default More;
