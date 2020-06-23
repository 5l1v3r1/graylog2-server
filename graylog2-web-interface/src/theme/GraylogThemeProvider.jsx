/* eslint-disable camelcase */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import CombinedProvider from 'injection/CombinedProvider';
import { breakpoints, fonts, utils } from 'theme';
import buttonStyles from 'components/graylog/styles/buttonStyles';
import CustomizationContext from 'contexts/CustomizationContext';

import { CUSTOMIZATION_THEME_MODE, THEME_MODE_LIGHT } from './constants';

const { CustomizationsActions } = CombinedProvider.get('Customizations');

/* NOTE: mode will eventually need to come from User Preferences */
const updateThemeMode = (theme_mode) => CustomizationsActions.update(CUSTOMIZATION_THEME_MODE, { theme_mode });


const loadTheme = (mode) => (/* eslint-disable */
  import(`theme/variants/${mode}.js`)
    .then((modeColors) => {
      return modeColors.default;
    })
    .catch((error) => {
      console.error('loading colors failed: ', error);
    })
/* eslint-enable */);


const GraylogThemeProvider = ({ children }) => {
  const themeMode = useContext(CustomizationContext)[CUSTOMIZATION_THEME_MODE];
  const [colors, setColors] = useState(null);
  const mode = themeMode?.theme_mode || THEME_MODE_LIGHT;

  loadTheme(mode).then((modeColor) =>{
    setColors(modeColor);
  });

  if (!colors) { return null };

  return (
    <ThemeProvider theme={{
      mode,
      updateThemeMode,
      breakpoints,
      colors,
      fonts,
      components: {
        button: buttonStyles({ colors }),
      },
      utils,
    }}>
      {children}
    </ThemeProvider>
  );
};

GraylogThemeProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default GraylogThemeProvider;
