export default defineNuxtRouteMiddleware((to, from) => {

    // console.log({to});
    // console.log({from});

    const {isAuthenticated, isAdmin} = useAuthentication()

    if( !isAuthenticated.value) {
        return navigateTo('/login')
    }

    if (to.path.startsWith('/dashboard') && !isAdmin.value){
        return navigateTo('/')
    }
    
//   if (to.params.id === '1') {
//     return abortNavigation()
//   }
//   // In a real app you would probably not redirect every route to `/`
//   // however it is important to check `to.path` before redirecting or you
//   // might get an infinite redirect loop
//   if (to.path !== '/') {
//     return navigateTo('/')
//   }

})
