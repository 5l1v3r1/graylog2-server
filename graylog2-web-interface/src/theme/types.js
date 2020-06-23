// @flow strict

import { type Breakpoints } from './breakpoints';
import { type Colors } from './colors';
import { type Fonts } from './fonts';
import { type Utils } from './utils';

export type ThemeInterface = {
  breakpoints: Breakpoints,
  colors: Colors,
  fonts: Fonts,
  utils: Utils,
};
