import User from "../../models/UserModel"

class UserResponse {
  constructor(private user: User) { }

  public build() {
    const userData = {
      id: this.user.id,
      email: this.user.email,
      role: this.user.role,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      isActive: this.user.isActive,
      lastLoginAt: this.user.lastLoginAt
    }

    return userData
  }
}

export default UserResponse
