import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';
import "../imports/startup/accounts-config";
// we have to tell the server to go run the accounts-config code on startup

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
  // imports react-target from main.html and renders our App code into it
});
// Meteor.startup is code we only want to run when the server reboots
