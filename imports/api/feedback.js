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
    })
};
// if our code is running on the server, we want to display it to the user and show all of the data on the Feedback table 
// we have to tell Meteor to do this since we uninstalled the autopublish feature

Meteor.methods({
    "feedback.insert"(studentID, message) {
        if (this.userId) {
            Feedback.insert({ studentID, message, timestamp: new Date() });
        } else {
            throw new Meteor.Error("User not authorized. Please provide login credentials or kindly step off.");
        }
    },

    "feedback.update"(feedbackID, updateFeedback) {
        if (this.userId) {
            Feedback.update(feedbackID, { $set: { message: updateFeedback } });
        } else {
            throw new Meteor.Error("User not authorized. Please provide login credentials or kindly step off.");

        }
    },
    "feedback.remove"(feedbackID) {
        if (this.userId) {
            Feedback.remove(feedbackID);
        } else {
            throw new Meteor.Error("User not authorized. Please provide login credentials or kindly step off.");

        }
    }
});
// we're moving the ability to update the database from the front end to the back end code 

export const Feedback = new Mongo.Collection("Feedback");
// exports a Mongo Collection called Feedback
// storing this in API so we can use the Feedback Collection on the front end and back end

