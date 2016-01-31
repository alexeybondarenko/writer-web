'use strict';

angular.module('app').factory('Book', function ($writer, User, BookSection) {

  function Book (options) {

    if (options instanceof Book) return options;

    var obj = options ? angular.copy(options) : {};

    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.image = obj.image;

    this.isPublic = obj.is_public;

    this.created_at = new Date(obj.created_at);
    this.updated_at = new Date(obj.updated_at);

    this.sections = (obj.sections || []).map(function (section) {
      return new BookSection(this.id, section);
    }.bind(this));

    this.user = obj.user_id ? User.byId(obj.user_id) : null;

    return this;
  }

  Book.prototype.create = function () {
    return $writer.createBook({
      name: this.name,
      description: this.description,
      image: this.image,
      is_public: this.isPublic
    }).then(function (resp) {
      return this.constructor(resp.data);
    }.bind(this));
  };

  Book.prototype.fetch = function () {
    return $writer.getBookById(this.id).then(function (resp) {
      return this.constructor(resp.data);
    }.bind(this));
  };
  Book.prototype.save = function () {
    return $writer.updateBookById(this.id, {
      name: this.name,
      description: this.description,
      image: this.image,
      is_public: this.isPublic
    });
  };
  Book.prototype.delete = function () {
    return $writer.deleteBookById(this.id);
  };

  // Comments

  Book.prototype.comments = function () {
    return $writer.getBookComments(this.id).then(function (comments) {
      this.comments = comments.data;
      return this.comments;
    }.bind(this));
  };

  Book.prototype.addComment = function (comment) {
    return $writer.createBookComment(this.id, comment);
  };

  // Sections
  Book.prototype.createSection = function () {
    return new BookSection(this.id);
  };
  Book.prototype.getSection = function (id) {
    return new BookSection(this.id, {id: id}).fetch();
  };

  Book.find = function (limit, offset) {
    return $writer.getBooks({
      limit: limit,
      offset: offset
    }).then(function (resp) {
      return resp.data.map(function (item) {
        return new Book(item);
      });
    });
  };

  Book.byId = function (bookId) {
    return new Book({id: bookId});
  };

  return Book;
});
