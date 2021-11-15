import {atom} from 'recoil'

const authenticatedUser = atom({
    key: 'authenticatedUser',
    default: {
        user: [],
        check: false
    }
})

export {authenticatedUser}