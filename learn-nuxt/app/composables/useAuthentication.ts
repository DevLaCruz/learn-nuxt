export const useAuthentication = () => {
    const {loggedIn, session, user, clear, fetch} = useUserSession()
    const login = async ( email: string, password: string) => {

        // no user uiseFetch dentro

     try {
        await $fetch('/api/auth/login',{
            method: 'POST',
            body: {email, password}
        });

        await fetch()
        navigateTo('/?message=Login successful')

        return true

     }catch (error){
        console.log(error)
        return false
     }
    }

    const register = async(fullName: string, email: string, password: string) =>{

        return true
    }

    const logout = async () => {
        await clear()
        navigateTo('/?message=Logout successful')
    }


return{
    loggedIn,
    session,
    user,


    // Getters
    isAuthenticated: loggedIn,
    isAdmin: computed(()=> user.value?.roles.includes('admin')),

    // Methods, Actions
    fetch,
    login,
    register,
    logout
}

}