import React from 'react';
import ReactDOM from 'react-dom';

const Main = () => {
  return <p>Main</p>;
};

export default Main;

if (document.getElementById('app')) {
  ReactDOM.render(<Main />, document.getElementById('app'));
}
