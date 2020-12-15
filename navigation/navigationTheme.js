import { DefaultTheme } from '@react-navigation/native';

import { Appearance } from 'react-native-appearance';
import lightColors from '../utils/lightColors'
import darkColors from '../utils/darkColors'

let currentColorScheme = Appearance.getColorScheme();

let Colors = currentColorScheme === 'light' ? lightColors : darkColors

const navigationTheme = {
  ...DefaultTheme,
  // override colors
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue,
    text: Colors.mediumGrey,
    border: Colors.blue,
    background: Colors.ghostWhite
  }
};

export default navigationTheme;
