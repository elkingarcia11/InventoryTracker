import React, { Component } from 'react';
import { ButtonGroup } from 'react-native-elements';

export class ButtonGroupComponent extends Component {
  constructor () {
    super();
    this.state = {
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
  }

  render () {
    const buttons = ['Users', 'Summary', 'Transactions'];
    const { selectedIndex } = this.state;

    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 40}}
      />
    )
  }
}

export default ButtonGroupComponent;
