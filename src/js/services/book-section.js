'use strict';

angular.module('app').factory('BookSection', function ($writer) {

  function BookSection (bookId, options) {

    if (options instanceof BookSection) return options;

    var obj = options ? angular.copy(options) : {};

    this.id = obj.id;
    this.name = obj.name;
    this.content = obj.content;
    this.status = obj.status;

    this.isPublic = obj.is_public;

    this.created_at = new Date(obj.created_at);
    this.updated_at = new Date(obj.updated_at);

    this.bookId = bookId;
    this.book = obj.book;

    return this;
  }

  BookSection.prototype.create = function () {
    return $writer.createBookSection(this.bookId, {
      name: this.name,
      content: this.content,
      status: this.status,
      is_public: this.isPublic
    }).then(function (resp) {
      return this.constructor(this.bookId, resp.data);
    }.bind(this));
  };

  BookSection.prototype.fetch = function () {
    return $writer.getBookSection(this.bookId, this.id).then(function (resp) {
      return this.constructor(this.bookId, resp.data);
    }.bind(this));
  };
  BookSection.prototype.save = function () {
    return $writer.updateBookSection(this.bookId, this.id, {
      name: this.name,
      content: this.content,
      status: this.status,
      is_public: this.isPublic
    });
  };
  BookSection.prototype.delete = function () {
    return $writer.deleteBookSection(this.bookId, this.id);
  };

  // Comments

  BookSection.prototype.getComments = function () {
    return $writer.getBookSectionComments(this.bookId, this.id).then(function (comments) {
      this.comments = comments;
      return this.comments;
    }.bind(this));
  };

  BookSection.prototype.addComment = function (comment) {
    return $writer.createBookSectionComment(this.bookId, this.id, comment);
  };

  return BookSection;
});
