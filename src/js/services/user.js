'use strict';

angular.module('app').factory('User', function ($writer) {

  function User (options) {

    var obj = options ? angular.copy(options) : {};

    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.created_at = new Date(obj.created_at);
    this.updated_at = new Date(obj.updated_at);

    this.followers = obj.followers;
    this.followings = obj.followings;

    this.isFollowed = obj.isFollowed;

    this.books = obj.books;
    this.reads = obj.reads;

    return this;
  }

  User.prototype.fetch = function () {
    return $writer.getUserById(this.id).then(function (resp) {
      return this.constructor(resp.data);
    }.bind(this));
  };
  User.prototype.save = function () {
    return $writer.userUpdate({
      name: this.name,
      description: this.description
    });
  };

  User.prototype.follow = function () {
    return $writer.followUser (this.id).then(function () {
      this.isFollowed = true;
    }.bind(this));
  };
  User.prototype.unfollow = function () {
    return $writer.unfollowUser (this.id).then(function () {
      this.isFollowed = false;
    }.bind(this))
  };

  User.prototype.fetchBooks = function () {
    return $writer.getUserBooks(this.id).then(function (resp) {
      this.books = resp.data;
      return this.books;
    }.bind(this));
  };

  User.my = function () {
    return $writer.user().then(function (resp) {
      return new User(resp.data);
    }.bind(this));
  };
  User.my.fetchBooks = function () {
    return $writer.userBooks().then(function (resp) {
      return resp.data;
    }.bind(this));
  };

  User.byId = function (userId) {
    var user = new User({id: userId});
    return user;
  };

  return User;
});
