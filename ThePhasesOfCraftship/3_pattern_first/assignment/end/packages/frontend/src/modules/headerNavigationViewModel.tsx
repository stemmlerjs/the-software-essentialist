import { Users } from "@dddforum/shared/src/api";

export class HeaderNavigationViewModel {
  constructor() {}

  async register(registrationDetails: Users.CreateUserParams) {

  }

  get currentPage () {
    return 'dashboard'
  }

  get isAuthenticated () {
    return false
  }

  get username () {
    return ''
  }
}
