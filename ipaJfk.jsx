import React from 'react';
import ReactDOM from 'react-dom';
import Main from './src/components/Main';
// import * as classes from './src/scss/app.scss';

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
