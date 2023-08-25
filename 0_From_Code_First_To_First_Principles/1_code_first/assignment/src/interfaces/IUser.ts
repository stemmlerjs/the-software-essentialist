export interface IUser {   
    userId: number, 
    email: {
        type: string,
        required: true
    },
    username: {
        type: string,
        required: true
    },
    firstName: {
        type: string,
        required: true
    },
    lastName: {
        type: string,
        required: true
    },
    password: {
        type: string,
        required: true
    }
}