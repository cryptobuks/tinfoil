import autobind from 'class-autobind';
import React from 'react';

export default class TinfoilComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    autobind(this);
  }
}
