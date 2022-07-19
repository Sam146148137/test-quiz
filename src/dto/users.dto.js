class UsersDto {
  static formatUserToJson(user) {
    return {

      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      email: user.firstName
    };
  }
}

export default UsersDto;
