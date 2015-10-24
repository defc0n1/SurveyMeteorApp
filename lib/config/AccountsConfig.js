/**
 * Created by NazIsEvil on 24/10/2015.
 */
if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

if(Meteor.isServer){
    Accounts.config({
        forbidClientAccountCreation : true
    });

}