import { DefaultTheme } from '@react-navigation/native';

import Colors from '../utils/colors';

const navigationTheme = {
  ...DefaultTheme,
  // override colors
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue,
    text: Colors.black,
    border: Colors.blue,
    background: Colors.ghostWhite
  }
};

export default navigationTheme;
