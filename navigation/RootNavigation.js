import { Notifications } from 'expo';
import { StackNavigator } from 'react-navigation';
import * as ScreenModules from '../screens/*.js';
import QR from '../screens/QR';

const SCREENS = {
  Main: { hideHeader: true },
  QRReader: { title: 'QR Reader' },
  QR: { screen:QR  }
};

Object.entries(ScreenModules).forEach(([name, Module]) => {
  (SCREENS[name] || (SCREENS[name] = {})).screen = Module;
});

const OPTIONS = {
  navigationOptions: ({navigation}) => {
    const screen = SCREENS[navigation.state.routeName];
    const title = screen.title || navigation.state.routeName;
    const header = screen.hideHeader ? null : undefined;
    return { title , header };
  },
}

export default StackNavigator(SCREENS, OPTIONS);
