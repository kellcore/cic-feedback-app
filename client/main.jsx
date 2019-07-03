import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
// import App from '/imports/ui/App';
import { renderRoutes } from '../imports/ui/Routes';
// instead of directly importing the App, we're going to import the renderRoutes function so we could theoretically import multiple components at once
import "../imports/startup/accounts-config";
// we have to tell the server to go run the accounts-config code on startup

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('react-target'));
  // imports react-target from main.html and renders our App code into it
});
// Meteor.startup is code we only want to run when the server reboots
