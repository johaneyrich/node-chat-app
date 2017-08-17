const expect = require('expect');
const assert = require('assert');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Johan';
    var text = 'noget text';

    var res = generateMessage(from, text);

    // assert.equal(res.from,from);
    // assert.equal(res.text,text);
    // expect(res.from).toBe(from);
    // expect(res.text).toBe(text);
    expect(res).toInclude({from, text});
    expect(res.createdAt).toBeA('number');

  });
  // store res  in variable
  // assert from match
  // assert text match
  // assert createdAt is a number - toBeA
});

// it('should create a new todo', (done) => {
//     var text = 'This is a dummy text';
//
//     request(app)
//       .post('/todos')
//       .set('x-auth', users[0].tokens[0].token)
//       .send({text})
