'use strict';
window.MyNameSpace = window.MyNameSpace || {};
window.MyNameSpace.MyBlog = window.MyNameSpace.MyBlog || {};

(function ($) {
    var defaultApiBaseUrl = '';

    var ApiRequest = function ApiRequest(apiBaseUrl) {
        this._apiBaseUrl = apiBaseUrl || defaultApiBaseUrl;
    };
    window.MyNameSpace.MyBlog.ApiRequest = ApiRequest;

    ApiRequest.prototype.listPosts = function () {
        return $.ajax({
            url: this._apiBaseUrl + '/posts',
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json'
        });
    };

    ApiRequest.prototype.createPost = function (title, content) {
        return $.ajax({
            url: this._apiBaseUrl + '/posts',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                title: title,
                content: content
            })
        });
    };

    ApiRequest.prototype.getPost = function (postId) {
        return $.ajax({
            url: this._apiBaseUrl + '/posts/' + postId,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json'
        });
    };

    ApiRequest.prototype.updatePost = function (postId, title, content) {
        return $.ajax({
            url: this._apiBaseUrl + '/posts/' + postId,
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                title: title,
                content: content
            })
        });
    };

    ApiRequest.prototype.deletePost = function (postId) {
        return $.ajax({
            url: this._apiBaseUrl + '/posts/' + postId,
            type: 'DELETE',
            contentType: 'application/json',
            dataType: 'json'
        });
    };

}(jQuery));
