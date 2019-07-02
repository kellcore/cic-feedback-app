import React from 'react';
import Hello from './Hello.jsx';
import Info from './Info.jsx';

const App = () => (
  <div className="container">
    {/* React refers to JS classes when using the class attribute -> className is for CSS instead */}
    <h1>Welcome to Meteor!</h1>
    <Hello />
    <Info />
  </div>
);

export default App;


