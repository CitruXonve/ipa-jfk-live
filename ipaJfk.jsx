import React from 'react';
import ReactDOM from 'react-dom';
import IpaMain from './src/components/IpaMain';
import './src/scss/app.scss';

function IpaJfk() {
  return (
    <div className="App">
      <IpaMain />
    </div>
  );
}

ReactDOM.render(<IpaJfk />, document.getElementById('root'));
