/**
 * Created by NazIsEvil on 24/10/2015.
 */
Meteor.methods({
    checkUser: function () {
        if (!Meteor.user()) {
            throw Meteor.Error("unauthorized", "You need full authentication");
        }
        return true;
    },
    addSurveyItem: function(itemImage, itemGroup){
        check(itemImage, String);
        check(itemGroup, String);

        if(!Meteor.user()){
            Images.remove({_id:itemImage});
            throw Meteor.Error("unauthorized", "You need full authentication");
        }

        SurveyItems.insert({image_id:itemImage,item_group_id:itemGroup});
    },
    deleteSurveyItem: function(itemId){
        Meteor.call('checkUser');

        check(itemId, String);

        var item = SurveyItems.findOne({_id:itemId});
        Images.remove({_id:item.image_id});
        SurveyItems.remove({_id:itemId});
    },
    addItemGroup: function(groupName){
        Meteor.call('checkUser');

        check(groupName, String);

        SurveyItemGroups.insert({groupName:groupName});
    }
});