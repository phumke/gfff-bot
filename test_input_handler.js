const input = require('./input_handler.js');
const assert = require('assert');

// TODO convert this to use mocha.js framework and sinon.js

test_mh_string = function() {
  var output = input.handle_message('mh');
  assert(output);
  assert(output.length > 1);
}

test_weenis_string = function() {
  var output = input.handle_message('weenis');
  assert(output === ':eggplant:');
}

test_unknown_string = function() {
  var output = input.handle_message('unknown string');
  assert(output === '');
}

test_input_string = function() {
  var output = input.handle_message('@Ubercode, :eggplant:');
  assert(output === '');
}

test_mh_string();
test_weenis_string();
test_unknown_string();
test_input_string();
