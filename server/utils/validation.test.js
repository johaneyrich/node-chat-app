const expect = require('expect');
//import isRealString
const {isRealString} = require('./validation.js');

//describe isRealString
describe('isRealString', () => {
  var number = 123;
  var text = "jjj";
  var ntText = "   2 ";
  var space = "   ";
  // should reject non-string values -- see if you get false back
  it('should reject non-string values', () => {
    var res = isRealString(number);
    expect(res).toBe(false);
  });
  // should reject string with only spaces -- false back
  it('should reject string with only spaces', () => {
    var res = isRealString(space);
    expect(res).toBe(false);
  });
  // should allow string with non-space characters
  it('should allow string with non-space characters', () => {
    var res = isRealString(ntText);
    expect(res).toBe(true);
  });
  //tester en string uden spaces
  it('should allow string with non-space characters', () => {
    var res = isRealString(text);
    expect(res).toBe(true);
  });

});
