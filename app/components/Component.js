import autobind from 'class-autobind';
import React from 'react';

export default class TinfoilComponent extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }
}
