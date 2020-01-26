import React, { Component } from 'react';
import { TextInput as NativeTextInput } from 'react-native';

export default class TextInput extends Component {
  state = {
     inputWidth: '99%'
  }

  componentDidMount() {
    setTimeout(() => this.setState({ inputWidth: 'auto' }), 100);
  }

  render() {
    const { inputWidth } = this.state;

    return <NativeTextInput
      {...this.props}
      style={{ ...this.props.style, width: inputWidth }}
    />
 }
}
