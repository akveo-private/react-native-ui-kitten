import React from 'react';
import { Radio } from 'react-native-ui-kitten';

export class RadioWithTextShowcase extends React.Component {

  state = {
    checked: false,
  };

  onChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <Radio
        text={`Checked: ${this.state.checked}`}
        checked={this.state.checked}
        onChange={this.onChange}
      />
    );
  }
}
