import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// importing ReactDOM instead of using jQuery to get our form values
import { withTracker } from "meteor/react-meteor-data";
// withTracker comes from the react-meteor-data package installed earlier
import { Feedback } from '../api/feedback';
// this was automatically created when I typed Feedback in the withTracker component below
import moment from "moment";
// installed moment and imported it into the app to format our timestamp



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
  render() {
    // console.log(this.props.feedback);
    // this allows us to check if our data made it from the Mongo Collection to the front end
    return (
      <div className="container">
        {/* React refers to JS classes when using the class attribute -> className is for CSS instead */}
        <form onSubmit={this.createFeedback}>
          {/* using curly braces here instead of quotes because we're using React classes so we have access to functions inside that class */}
          {/* Building out form with tables to make the front end user interface with HTML inside JS -> JSX */}
          <div className="row">
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
              <button type="submit" className="btn btn-primary"> Save </button>
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
                </tr>
              </thead>
              <tbody>
                {this.props.feedback.map(feedback => {
                  // console.log(feedback);
                  return <tr key={feedback._id}><td>{feedback.studentID}</td><td>{feedback.message}</td><td>{moment(feedback.timestamp).format("L")}</td></tr>
                })}
                {/* refers to the array we console logged earlier to view what's in the feedback table */}
                {/* since the result of this.props.feedback is an array, we can iterate over it using the map function */}
                {/* each time new feedback is entered, we want to return it in a new table row with a new table column */}
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
