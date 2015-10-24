/**
 * Created by NazIsEvil on 24/10/2015.
 */
Meteor.methods({
    checkUser: function () {
        if (!Meteor.user()) {
            throw new Meteor.Error(401, "unauthorized", "You need full authentication");
        }
        return true;
    },
    addSurveyItem: function(itemImage, itemGroup){
        check(itemImage, String);
        check(itemGroup, String);

        if(!Meteor.user()){
            Images.remove({_id:itemImage});
            throw new Meteor.Error(401, "unauthorized", "You need full authentication");
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
        var groupNameLowered = groupName.toLowerCase();
        var itemGroup = SurveyItemGroups.find( { $where: "this.groupName.toLowerCase().indexOf('"+groupNameLowered+"') >= 0" }).count();
        if(itemGroup > 0){
            throw new Meteor.Error(500,'group-exist',"Item Group Already Exists");
        }
        SurveyItemGroups.insert({groupName:groupName});
    },
    deleteSurveyItemGroup: function(groupId){
        Meteor.call('checkUser');

        check(groupId, String);
        SurveyItemGroups.remove({_id:groupId});
    }
});