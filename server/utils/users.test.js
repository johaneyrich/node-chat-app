const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
        id: 1,
        name: 'Joe',
        room: 'first room'
    },{
        id: 2,
        name: 'Joe-anne',
        room: 'second room'
    },{
        id: 3,
        name: 'Joesef',
        room: 'first room'
    }];
  });

  it('should add a new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Johan',
      room: 'The basement'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);

  });

  it('should return names for first room',() => {
    var userList = users.getUserList('first room');
    expect(userList).toEqual(['Joe','Joesef']);
  });

  it('should return the user object {id, name, room}',() => {
    var user = users.getUser(1);

    expect(user).toEqual(users.users[0]);
  });

  it('should not return an unknowned user',() => {
    var user = users.getUser(44);

    expect('undefinded');
  });

  it('should return the deleted user and delete the user from the array', () => {
    var userId = 1;
    var user = users.getUser(userId);
    var removedUser = users.removeUser(userId);

    expect(user).toEqual(removedUser);
    expect(users.users.length).toBe(2);
  });

  it('should not delete user', () => {
    var userId = 99;
    var user = users.getUser(userId);
    var removedUser = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);

  })

});
