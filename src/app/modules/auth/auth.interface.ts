export type TUser = {
    name: string,
    email: string,
    password: string,
    role: 'user',
    isBlocked: boolean,
}

export type TLogInUser = {
    email: string,
    password: string
}