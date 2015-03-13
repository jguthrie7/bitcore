'use strict';

var should = require('chai').should();
var P2P = require('../../../');
var Messages = P2P.Messages;
var sinon = require('sinon');

describe('Command Messages', function() {

  var messages = new Messages();
  var constructors = ['GetData', 'Inventory', 'NotFound'];

  describe('Inventory helpers for: ' + constructors.join(', '), function() {

    var fakeHash = 'e2dfb8afe1575bfacae1a0b4afc49af7ddda69285857267bae0e22be15f74a3a';
    
    describe('#forTransaction', function() {
      constructors.forEach(function(name) {
        it(name, function() {
          var message = messages[name].forTransaction(fakeHash);
          should.exist(message);
          message.should.be.instanceof(messages[name]);
        });
      });
    });
    
    describe('#forBlock', function() {
      constructors.forEach(function(name) {
        it(name, function() {
          var message = messages[name].forBlock(fakeHash);
          should.exist(message);
          message.should.be.instanceof(messages[name]);
        });
      });
    });
    
    describe('#forFilteredBlock', function() {
      constructors.forEach(function(name) {
        it(name, function() {
          var message = messages[name].forFilteredBlock(fakeHash);
          should.exist(message);
          message.should.be.instanceof(messages[name]);
        });
      });
    });

  });


  describe('FilterLoad', function() {
    
    it('should return a null payload', function() {
      var message = messages.FilterLoad();
      var payload = message.getPayload();
      payload.length.should.equal(0);
      payload.should.be.instanceof(Buffer);
    });

  });

  describe('Transaction', function() {

    it('should be able to pass a custom Transaction', function(done) {
      var Transaction = function(){};
      Transaction.prototype.fromBuffer = function() {
        done();
      };
      var messagesCustom = new Messages({Transaction: Transaction});
      var message = messagesCustom.Transaction.fromBuffer();
      should.exist(message);
    });
    
    it('should work with Transaction.fromBuffer', function(done) {
      var Transaction = sinon.stub();
      Transaction.fromBuffer = function() {
        done();
      };
      var messagesCustom = new Messages({Transaction: Transaction});
      var message = messagesCustom.Transaction.fromBuffer();
      should.exist(message);
    });

  });

  describe('Block', function() {
    
    it('should be able to pass a custom Block', function(done) {
      var Block = sinon.stub();
      Block.fromBuffer = function() {
        done();
      };
      var messagesCustom = new Messages({Block: Block});
      var message = messagesCustom.Block.fromBuffer();
      should.exist(message);
    });

  });

  describe('GetBlocks', function() {
    
    it('should error with invalid stop', function() {
      var invalidStop = '000000';
      var starts = ['000000000000000013413cf2536b491bf0988f52e90c476ffeb701c8bfdb1db9'];
      (function() {
        var message = messages.GetBlocks({starts: starts, stop: invalidStop});
        var buffer = message.toBuffer();
        should.not.exist(buffer);
      }).should.throw('Invalid hash length');
    });

  });

  describe('GetHeaders', function() {
    
    it('should error with invalid stop', function() {
      var invalidStop = '000000';
      var starts = ['000000000000000013413cf2536b491bf0988f52e90c476ffeb701c8bfdb1db9'];
      (function() {
        var message = messages.GetHeaders({starts: starts, stop: invalidStop});
        var buffer = message.toBuffer();
        should.not.exist(buffer);
      }).should.throw('Invalid hash length');
    });

  });

  describe('MerkleBlock', function() {
    
    it('should return null buffer for payload', function() {
      var message = messages.MerkleBlock();
      var payload = message.getPayload();
      payload.length.should.equal(0);
    });

  });


});
