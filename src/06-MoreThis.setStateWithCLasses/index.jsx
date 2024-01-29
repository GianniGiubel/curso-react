import './styles.css';

import { Component } from 'react';

export class Home extends Component {
  state = {
    counter: 0
  }

  handleClick = () => {
    this.setState( 
      (prevState, prevProps) => {
        console.log('Previous', prevState.counter);
        return {counter: prevState.counter + prevProps.numberToIncrement}
      }, 
      () => {
      console.log('Posterior', this.state.counter);
      }
    );
  }

  render() {
    return (
      <div className='container'>
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}