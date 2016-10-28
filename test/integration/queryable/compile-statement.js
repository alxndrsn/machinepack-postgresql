var assert = require('assert');
var Pack = require('../../../');

describe('Queryable ::', function() {
  describe('Compile Statement', function() {
    it('should generate a SQL Statement from a WLQL query', function(done) {
      Pack.compileStatement({
        statement: {
          select: ['title', 'author', 'year'],
          from: 'books'
        }
      })
      .exec(function(err, report) {
        if (err) {
          return done(err);
        }

        assert.equal(report.nativeQuery.sql, 'select "title", "author", "year" from "books"');
        return done();
      });
    });

    // TODO: Add lots of checking to the statement compiler
    it.skip('should return the malformed exit for bad WLQL', function(done) {
      Pack.compileStatement({
        statement: {
          foo: 'bar',
          from: 'books'
        }
      })
      .exec(function(err) {
        assert(err);
        assert.equal(err.exit, 'malformed');
        return done();
      });
    });
  });
});