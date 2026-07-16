import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
}

const HomePath = ({ color }: { color: string }) => (
  <G>
    <Path
      d="M15,21v-8c0,-0.265 -0.1054,-0.52 -0.2929,-0.707c-0.1875,-0.188 -0.4419,-0.293 -0.7071,-0.293h-4c-0.2652,0 -0.5196,0.105 -0.7071,0.293c-0.1875,0.187 -0.2929,0.442 -0.2929,0.707v8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3,10c-0.0001,-0.291 0.0633,-0.578 0.1858,-0.842c0.1224,-0.264 0.301,-0.498 0.5232,-0.686l7,-6c0.361,-0.305 0.8184,-0.472 1.291,-0.472c0.4726,0 0.93,0.167 1.291,0.472l7,6c0.2222,0.188 0.4008,0.422 0.5232,0.686c0.1225,0.264 0.1858,0.551 0.1858,0.842v9c0,0.53 -0.2107,1.039 -0.5858,1.414c-0.3751,0.375 -0.8838,0.586 -1.4142,0.586h-14c-0.5304,0 -1.0391,-0.211 -1.4142,-0.586c-0.3751,-0.375 -0.5858,-0.884 -0.5858,-1.414z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </G>
);

export const HomeActive: React.FC<IconProps> = ({ color = '#000', size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <HomePath color={color} />
  </Svg>
);

export const HomeInactive: React.FC<IconProps> = ({ color = '#000', size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <HomePath color={color} />
  </Svg>
);

/**
 * Default export as Home component that switches between active/inactive.
 */
const Home: React.FC<IconProps & { active?: boolean }> = ({ active, ...props }) => {
  return active ? <HomeActive {...props} /> : <HomeInactive {...props} />;
};

export default Home;
