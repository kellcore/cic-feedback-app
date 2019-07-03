import { Mongo } from 'meteor/mongo';

if (Meteor.isServer) {
    Meteor.publish("feedback", function displayFeedback() {
        if (this.userId) {
            return Feedback.find();
        } else {
            return null;
        }
        // if there's a userID provided, return the data from the Feedback table, otherwise return nothing
        // we need to take these steps to make sure our data can't be found by people opening the console or looking in MiniMongo without logging in as users
        // we moved this logic from the front end code in App.jsx to the API here in feedback.js so that the server itself is showing and hiding the info and not the UI
        // table is empty when you log out because the server isn't sending anything from the database
    });
}
// if our code is running on the server, we want to display it to the user and show all of the data on the Feedback table 
// we have to tell Meteor to do this since we uninstalled the autopublish feature

export const Feedback = new Mongo.Collection("Feedback");
// exports a Mongo Collection called Feedback
// storing this in API so we can use the Feedback Collection on the front end and back end

