import React from 'react';

class CrashingComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    
    handleClick = () => this.setState({hasError: true});
    
    render() {
      if (this.state.hasError) {
        throw new Error("I failed.", );
      }
      return <label onClick={() => this.handleClick()}
        >Click here to simulate error in error boundary!</label>;
    }
}
export default CrashingComponent;