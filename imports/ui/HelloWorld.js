import React, { Component } from 'react';
// import hedgehog from "./hedgehog.jpg"

export default class HelloWorld extends Component {
    render() {
        return (
            <div className="container">
                <img src="/hedgehog.jpg" />
                <h1> Congratulations! </h1>
                <h2> You've reached the super special bonus page! </h2>
                <h3> Don't forget to create an account to access the feedback information! </h3>
                <h4> Otherwise, kindly exit the site and browse elsewhere. </h4>
                <h5> Have a lovely day! </h5>
            </div>
        )
    }
};