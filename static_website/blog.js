'use strict';
window.MyNameSpace = window.MyNameSpace || {};
window.MyNameSpace.MyBlog = window.MyNameSpace.MyBlog || {};

(function ($) {
    var request;

    $(function () {
        request = new window.MyNameSpace.MyBlog.ApiRequest();
        request.listPosts().done(displayPosts);
        $('#linkNewPost').click(showNewPostDialog);
    });

    var displayPosts = function (data) {
        var $divPosts = $('#divPosts');
        var $tBody = $('<table><tbody>').appendTo($divPosts);
        var unixtime2Date = function (unixtime) {
            var date = new Date(unixtime);
            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
                + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        };
        var createPostTr = function (postId, title) {
            var $titleTd = $('<td>');
            var $link = $('<a>').attr('href', '#')
                .append(document.createTextNode(title))
                .appendTo($titleTd)
                .click(onClickTitle);
            var $postIdTd = $('<td>')
                .append(document.createTextNode(unixtime2Date(postId)));
            var $deleteButtonTd = $('<td>').append(
                $('<input>')
                    .attr('type', 'button')
                    .val('delete')
                    .click(onClickDeleteButton)
            );
            return $('<tr>')
                .data('postId', postId.toString())
                .append($titleTd)
                .append($postIdTd)
                .append($deleteButtonTd);
        };
        data.Items.forEach(function (post) {
            createPostTr(post.PostId, post.title).appendTo($tBody);
        });
    }

    var onClickTitle = function () {
        var postId = $(this).closest('tr').data('postId');
        request.getPost(postId).done(function (data) {
            var post = data.Items[0];
            showPostInDialog(postId, post.title, post.content);
        });
    };

    var onClickDeleteButton = function () {
        var postId = $(this).closest('tr').data('postId');
        request.deletePost(postId).done(function () {
            request.listPosts().done(function (data) {
                $('#divPosts').empty();
                displayPosts(data);
            });
        });
    };

    var craeteModalBase = function () {
        var $titleParagraph = $('<p>').append(
            $('<input>')
                .addClass('post-title')
                .attr('type', 'text')
        );
        var $contentTextarea = $('<textarea>')
            .addClass('post-content')
            .attr('cols', '80')
            .attr('rows', '20');
        var $dialogContent = $('<div>')
            .addClass('modal-dialog')
            .append($titleParagraph)
            .append($contentTextarea);
        return $('<div>')
            .addClass('modal-background')
            .append($dialogContent)
            .appendTo(document.body);
    };

    var showPostInDialog = function (postId, title, content) {
        var $modalBody = craeteModalBase();
        var $closeButtonParagraph = $('<p>').append(
            $('<input>')
                .attr('type', 'button')
                .val('close')
                .click(function () { $modalBody.remove(); })
        ).append(
            $('<input>')
                .attr('type', 'button')
                .val('update')
                .click(function () {
                    var title = $modalBody.find('.post-title').val();
                    var content = $modalBody.find('.post-content').val();
                    request.updatePost(postId, title, content).done(function () {
                        $modalBody.remove();
                        request.listPosts().done(function (data) {
                            $('#divPosts').empty();
                            displayPosts(data);
                        });
                    });
                })
        );
        $modalBody.find('.post-title').val(title);
        $modalBody.find('.post-content').val(content);
        $modalBody.find('.modal-dialog').append($closeButtonParagraph);
    };

    var showNewPostDialog = function () {
        var $modalBody = craeteModalBase();
        var $submitButtonParagraph = $('<p>').append(
            $('<input>')
                .attr('type', 'button')
                .val('submit')
                .click(function () {
                    var title = $modalBody.find('.post-title').val();
                    var content = $modalBody.find('.post-content').val();
                    request.createPost(title, content).done(function () {
                        $modalBody.remove();
                        request.listPosts().done(function (data) {
                            $('#divPosts').empty();
                            displayPosts(data);
                        });
                    });
                })
        );
        $modalBody.find('.modal-dialog').append($submitButtonParagraph);
    }

}(jQuery));