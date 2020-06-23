// @flow strict
import PropTypes from 'prop-types';

import breakpoints from './breakpoints';
import fonts from './fonts';
import utils from './utils';
import type { ThemeInterface } from './types';

const themePropTypes = PropTypes.shape({
  breakpoints: PropTypes.object,
  colors: PropTypes.object,
  fonts: PropTypes.object,
  utils: PropTypes.object,
});

export {
  breakpoints,
  fonts,
  utils,
  themePropTypes,
};

export type { ThemeInterface };
