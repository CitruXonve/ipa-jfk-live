import React from 'react';
import ReactDOM from 'react-dom';
import IpaMain from './components/IpaMain';
import './scss/app.scss';

function IpaJfk(): JSX.Element {
  return (
    <div className="App">
      <IpaMain />
    </div>
  );
}

ReactDOM.render(<IpaJfk />, document.getElementById('root'));
