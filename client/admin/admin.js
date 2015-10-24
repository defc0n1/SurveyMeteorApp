/**
 * Created by NazIsEvil on 24/10/2015.
 */
itemPaginator = new Paginator(SurveyItems);
itemGroupsPaginator = new Paginator(SurveyItemGroups);

Template.itemForm.events({
    'submit form#addSurveyItem': function (event, template) {
        event.preventDefault();
        var file = event.target.imageUpload.files[0];
        var itemImage;
        var itemGroup = event.target.itemGroup.value;
        Images.insert(file, function (err, obj) {
            if (err !== undefined) {
                throw Meteor.Error('upload-fail', "File upload failed");
            } else {
                Meteor.call('addSurveyItem', obj._id, itemGroup);
            }
        });

        event.target.reset();
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

Template.itemGroupForm.events({
    'submit form#addItemGroup': function (event, template) {
        event.preventDefault();
        Method.call('addItemGroup',event.target.groupName.value);
        event.target.reset();
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