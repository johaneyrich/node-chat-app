

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
  constructor() {
    this.users = [];
  };

  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  };

  removeUser(id){
    //return user just removed
    var user = this.getUser(id);
    if(user) {
      this.users = this.users.filter(function(user) {
          return user.id !== id;
      });
    }

    return user;
  };

  getUser(id) {
    //return the user
    var user = this.users.filter((user) => {
      return user.id === id;
    })[0];

    return user;
  };

  getUserList(room) {
    //return all users in that room - array of strings
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    var namesArray = users.map((user) => {
      return user.name;
    });

    return namesArray;
  }

}

module.exports = {Users};
