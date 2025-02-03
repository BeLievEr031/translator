import { create } from 'zustand'

const userAuthStore = create((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => {
        console.log(user);
        return set({ user: user })
    },
    setLogin: (login) => {
        console.log(login);
        return set({ isLoggedIn: login })
    }
}))

export default userAuthStore;