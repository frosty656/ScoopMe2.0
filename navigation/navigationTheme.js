import { DefaultTheme } from '@react-navigation/native';

import Colors from '../utils/colors';

const navigationTheme = {
  ...DefaultTheme,
  // override colors
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.black,
    text: Colors.black,
    border: Colors.mediumGrey,
    background: Colors.ghostWhite
  }
};

export default navigationTheme;
