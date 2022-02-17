import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const Main = () => {
  return <App />;
};

export default Main;

if (document.getElementById('app')) {
  ReactDOM.render(<Main />, document.getElementById('app'));
}
