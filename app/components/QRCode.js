import React from 'react';
import { Text } from 'react-native';
import QRCodeImage from 'react-native-qrcode-image';
import PropTypes from 'prop-types';
import PureComponent from './PureComponent';

export default class QRCode extends PureComponent {
  static defaultProps = {
    size: 128,
  };

  static propTypes = {
    value: PropTypes.string.isRequired,
    size: PropTypes.number,
  };

  constructor() {
    super();
    this.state = { load: false };
  }

  render() {
    const { size, value } = this.props;
    const { load } = this.state;
    if (!load) setTimeout(() => this.setState({ load: true }), 50);

    return (this.state.load
      ? <QRCodeImage value={value} size={size} />
      : <Text>...</Text>
    );
  }
}
