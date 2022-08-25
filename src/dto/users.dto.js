class UsersDto {
  static formatUserToJson(user) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      gender: user.gender,
      email: user.email
    };
  }
}

export default UsersDto;
