import React from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class BackButton extends React.Component {
  render() {
    return <Button title="Back" onPress={() => this.props.navigation.goBack() } />;
  }
}
// withNavigation returns a component that wraps NavButton and passes in the navigation prop
export default withNavigation(BackButton);