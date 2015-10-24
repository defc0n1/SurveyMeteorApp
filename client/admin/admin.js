/**
 * Created by NazIsEvil on 24/10/2015.
 */
itemPaginator = new Paginator(SurveyItems);
itemGroupsPaginator = new Paginator(SurveyItemGroups);

Template.itemForm.onCreated(function () {
    Session.set('errorMsg',undefined);
});
Template.itemForm.events({
    'submit form#addSurveyItem': function (event, template) {
        event.preventDefault();
        var file = event.target.imageUpload.files[0];
        var itemImage;
        var itemGroup = event.target.itemGroup.value;
        Images.insert(file, function (err, obj) {
            if (err !== undefined) {
                Session.set('errorMsg', "File upload failed");
                throw Meteor.Error(500, 'upload-fail', "File upload failed");
            } else {
                Meteor.call('addSurveyItem', obj._id, itemGroup, function (err) {
                    if (err === undefined) {
                        event.target.reset();

                        Session.set('errorMsg',undefined);
                    } else {
                        Session.set('errorMsg', err.details);
                    }
                });
            }
        });
    }
});
Template.itemForm.helpers({
    itemGroups: function () {
        return SurveyItemGroups.find();
    }
});
Template.itemTable.events({
    'click .deleteItem': function (event) {
        var id = event.target.dataset.id;
        if (id === undefined) {
            id = event.target.parentNode.dataset.id;
        }

        Meteor.call('deleteSurveyItem', id);
    }
});
Template.itemTable.helpers({
    surveyItems: function () {
        return itemPaginator.find({}, {itemsPerPage: 1});
    },
    surveyItemsCount: function () {
        return SurveyItems.find({}).count();
    },
    getGroupName: function () {
        var group = SurveyItemGroups.findOne({_id: this.item_group_id});
        if (group !== undefined) {
            return group.groupName;
        }
    },
    getImage: function () {
        var image = Images.findOne({_id: this.image_id});
        if (image !== undefined) {
            return {url: image.url(), name: image.original.name};
        }
    }
});

Template.itemGroupForm.onCreated(function () {
    Session.set('errorMsg',undefined);
});

Template.itemGroupForm.events({
    'submit form#addSurveyItemGroup': function (event, template) {
        event.preventDefault();
        Meteor.call('addItemGroup', event.target.groupName.value, function (err) {
            if (err === undefined) {
                event.target.reset();
                Session.set('errorMsg',undefined);
            } else {
                Session.set('errorMsg', err.details);
            }
        });
    }
});

Template.itemGroupForm.helpers({
    errorMsg: function () {
        return Session.get('errorMsg');
    }
});

Template.itemGroupTable.helpers({
    surveyItemGroups: function () {
        return itemGroupsPaginator.find({}, {itemsPerPage: 10});
    },
    surveyItemGroupsCount: function () {
        return SurveyItemGroups.find({}).count();
    }
});

Template.itemGroupTable.events({
    'click .deleteItem': function (event) {
        var id = event.target.dataset.id;
        if (id === undefined) {
            id = event.target.parentNode.dataset.id;
        }

        Meteor.call('deleteSurveyItemGroup', id);
    }
});