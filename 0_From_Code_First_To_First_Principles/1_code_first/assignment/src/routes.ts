import { UserController } from './controller/user.controller'
import { CreateUserDto } from './dto/create-user.dto'
import { EditUserDto } from './dto/edit-user.dto'

export const Routes = [
    {
        method: 'get',
        route: '/users',
        controller: UserController,
        dto: undefined,
        action: 'get',
    },
    {
        method: 'post',
        route: '/users/new',
        controller: UserController,
        dto: CreateUserDto,
        action: 'create',
    },
    {
        method: 'patch',
        route: '/users/edit/:userId',
        controller: UserController,
        dto: EditUserDto,
        action: 'edit',
    },
]
