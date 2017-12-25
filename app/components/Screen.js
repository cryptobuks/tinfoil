import Component from './component';

export default class Screen extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.navigation.stackNav.index === 0) {
      return true;
    }
    return false;
  }
}
