export default defineNuxtRouteMiddleware((to, from) => {

    // console.log({to});
    // console.log({from});


    const {isAuthenticated } = useAuthentication()


    if (to.path.startsWith('/login') && isAuthenticated.value){
        return navigateTo('/')
    }


    if (to.path.startsWith('/register') && isAuthenticated.value){
        return navigateTo('/')
    }


    
})
