import React from 'react';
import ReactDOM from 'react-dom';
import IpaMain from './components/IpaMain';
import './styles/app.scss';

function IpaJfk(): JSX.Element {
  return (
    <div>
      <IpaMain />
    </div>
  );
}

ReactDOM.render(<IpaJfk />, document.getElementById('root'));
