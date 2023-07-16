import { UserController } from './controller/user.controller'

export const Routes = [
    {
        method: 'get',
        route: '/users/:id',
        controller: UserController,
        action: 'get',
    },
    {
        method: 'post',
        route: '/users/new',
        controller: UserController,
        action: 'create',
    },
    {
        method: 'patch',
        route: '/users/edit/:userId',
        controller: UserController,
        action: 'edit',
    },
]
