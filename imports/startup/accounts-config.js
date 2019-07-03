import { Accounts } from "meteor/accounts-base";

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
// when accounts goes to set up the ui configuration, change the login with email to login with username