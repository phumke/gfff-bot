const input = require('../src/input_handler.js');
const assert = require('assert');

// TODO convert this to use mocha.js framework and sinon.js

test_exact_string = function() {
  var output = input.handle_message('weenis');
  assert(output === ':eggplant:');
}

test_include_all_string = function() {
  var output = input.handle_message('brett loves men');
  assert(output);
  assert(output.includes('(Always)'));
}

test_regex_string = function() {
  var output = input.handle_message('our 3 heros');
  assert(output);
  assert(output.includes(','));
}

test_unknown_string = function() {
  var output = input.handle_message('unknown string');
  assert(output === '');
}

test_return_promise = function() {
  var output = input.handle_message('ranks');
  assert(typeof output.then === 'function');
}

test_return_promise();
test_exact_string();
test_include_all_string();
test_regex_string();
test_unknown_string();
