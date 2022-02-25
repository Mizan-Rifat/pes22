import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RolePermission from './role-permission/RolePermission';

const Main = () => {
  return <RolePermission />;
};

export default Main;

if (document.getElementById('app')) {
  ReactDOM.render(<Main />, document.getElementById('app'));
}
