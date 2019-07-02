import { Mongo } from 'meteor/mongo';

export const Feedback = new Mongo.Collection("Feedback");
// exports a Mongo Collection called Feedback
// storing this in API so we can use the Feedback Collection on the front end and back end