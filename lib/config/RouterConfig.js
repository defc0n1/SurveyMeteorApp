/**
 * Created by NazIsEvil on 24/10/2015.
 */
Router.configure({
    layoutTemplate: 'main'
});
Router.route("/",function(){
    if(Meteor.user()){
        this.render('dashboard');
    }else{
        this.render('survey');
    }
});
Router.route("/results", function(){
    this.render('results');
});
Router.route("/maintenance/survey-items", function(){
    this.render('surveyItem');
});

Router.route("/maintenance/survey-item-groups", function(){
    this.render('surveyItemGroups');
});