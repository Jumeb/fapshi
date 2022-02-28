import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';

import {SplashScreen} from '../screens';

const Routes = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar>
        <Scene key="splash" component={SplashScreen} hideNavBar />
      </Stack>
    </Router>
  );
};

export default Routes;
