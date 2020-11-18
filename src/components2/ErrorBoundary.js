import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
      //Catch errors in components below, re-render with error message.
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      //Optional: Log to an error reporting service here.
      console.log("======= error");
      console.log(error);
    }
    
    render() {

        const info=this.state.errorInfo;
        const title=this.state.error && this.state.error.toString();

        if(!title && !info){
            //Normally, render the children.
            return this.props.children;
        }

        return (
          <div>
            <h3>Oops, an error!</h3>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {title}
              <br />
              {info.componentStack}
            </details>
          </div>
        );
    }  
  }
  export default ErrorBoundary;