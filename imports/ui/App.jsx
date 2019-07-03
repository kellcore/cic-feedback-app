import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// importing ReactDOM instead of using jQuery to get our form values
import { withTracker } from "meteor/react-meteor-data";
// withTracker comes from the react-meteor-data package installed earlier
import { Feedback } from '../api/feedback';
// this was automatically created when I typed Feedback in the withTracker component below
import moment from "moment";
// installed moment and imported it into the app to format our timestamp
import AccountsUIWrapper from "./AccountsUIWrapper";
// importing the wrapper from the AccountsUIWrapper.js file we created to hold the Accounts UI Wrapper code found on the MeteorJS site



class App extends Component {

  createFeedback = event => {
    // have to use arrow syntax because we want access to the whole class
    event.preventDefault();
    // this prevents the page from refreshing -> have to pass in event parameter first
    const studentID = ReactDOM.findDOMNode(this.refs.studentID).value;
    // go to the DOM, find the element we called student ID, and store the value of it in the variable
    const message = ReactDOM.findDOMNode(this.refs.message).value;
    // console.log(studentID, message);
    Feedback.insert({ studentID, message, timestamp: new Date() });
    // this is what we write instead of Fetch -> React and Meteor recognized there was something new in the Mongo Collection and updated the information for us
    ReactDOM.findDOMNode(this.refs.studentID).value = "";
    ReactDOM.findDOMNode(this.refs.message).value = "";

  };

  editFeedback = (feedbackID) => {
    // console.log(feedbackID);
    // checking to make sure the feedback ID is getting passed to the edit button correctly and that our onclick event is working
    const updateFeedback = window.prompt("How would you like to change your feedback?");

    Feedback.update(feedbackID, { $set: { message: updateFeedback } });
    // Feedback refers to the Mongo Collection we set up over at feedback.js so we're directly updating our database -> building an object to set the message equivalent to the information stored in the updateFeedback variable
  };

  deleteFeedback = (feedbackID) => {
    // console.log(feedbackID);
    const confirmDeletion = window.confirm("Are you sure you want to remove this feedback?");

    if (confirmDeletion) {
      Feedback.remove(feedbackID);
    }
    // if the user clicks Ok on the confirm prompt, remove the feedback of the associated feedback ID
  };

  render() {
    // console.log(this.props.feedback);
    // this allows us to check if our data made it from the Mongo Collection to the front end
    return (
      <div className="container">
        {/* React refers to JS classes when using the class attribute -> className is for CSS instead */}
        <AccountsUIWrapper />
        <form style={{ marginBottom: 10 }} onSubmit={this.createFeedback}>
          {/* using curly braces here instead of quotes because we're using React classes so we have access to functions inside that class */}
          {/* Building out form with tables to make the front end user interface with HTML inside JS -> JSX */}
          <div className="row" style={{ marginTop: 50 }}>
            <div className="col-md">
              <div className="form-group">
                <label> Student ID: </label>
                <input className="form-control" ref="studentID" />
                {/* references the element this.studentID */}
              </div>
            </div>
            <div className="col-md">
              <div className="form-group">
                <label> Message: </label>
                <input className="form-control" ref="message" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <button type="submit" className="btn btn-success"> Save </button>
            </div>
          </div>
        </form>
        {/* Building form to create data, now creating table to make data readable to the front end users */}
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th> Student ID </th>
                  <th> Message </th>
                  <th> Timestamp </th>
                  <th> Edit </th>
                  <th> Delete </th>
                </tr>
              </thead>
              <tbody>
                {this.props.feedback.map(feedback => {
                  // console.log(feedback);
                  return <tr key={feedback._id}>
                    <td>{feedback.studentID}</td>
                    <td>{feedback.message}</td>
                    <td>{moment(feedback.timestamp).format("L")}</td>
                    <td><button className="btn btn-warning" onClick={this.editFeedback.bind(this, feedback._id)}>Edit</button></td>
                    <td><button className="btn btn-danger" onClick={this.deleteFeedback.bind(this, feedback._id)}>Delete</button></td>
                  </tr>
                })}
                {/* refers to the array we console logged earlier to view what's in the feedback table */}
                {/* since the result of this.props.feedback is an array, we can iterate over it using the map function */}
                {/* each time new feedback is entered, we want to return it in a new table row with a new table column */}
                {/* each time a new column is created, new edit and delete buttons will also generate for it */}
                {/* we're using bind for the edit and delete buttons because we don't want this code to run automatically when the page is loaded -> only passes in the information when the onclick is fired*/}
                {/* have to pass in the feedback id so the button knows which feedback to edit */}
              </tbody>
            </table>
          </div>
        </div>
        {/* <h1>Welcome to Meteor!</h1> */}
      </div>
    );
  }
}
// we're going to define a bunch of functions in the Component that go in the class App


export default withTracker(() => {
  return {
    feedback: Feedback.find({}).fetch()
    // fetch() will put all of the Feedback into an array
  }
})(App);
// we tell withTracker that we want to access the info from Feedback in our App

// have to turn on meteor server before running meteor mongo or else it won't load
// meteor mongo is a shell inside the terminal that directly access the mongodb datatabase
