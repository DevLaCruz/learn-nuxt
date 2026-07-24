export const usePaginatedProducts = async() =>{

    // lo composables solo se disparan 1 vez y luego ocupamos las referencias a las variables reactivas
    const route = useRoute()

    const page = computed(()=>{
        const pageParam = route.query.page as string
        return isNaN(+pageParam) ? 1 : +pageParam
    })

    const limit = computed(()=>{
        const limitParam = route.query.limit as string
        return isNaN(+limitParam) ? 10 : +limitParam
    })

    // si mi backend trabaja con un offset entonces para calcularlo vamos a hacer:
    const offset = computed(()=>{
        return (page.value - 1) * limit.value
    })

    console.log({query: route.query});
    

    const {data, error, status, execute, pending} = await useFetch(
        '/api/products',
        {
            query: {
                limit,
                offset
            },

            watch: [page, limit],
        }
    )

    return {
        data, // cuando volvemos a hacer la peticion, necesitamos que esto sea reactiva
        // para que cambie dinamicamente los argumentos y tener que hacer un refresh

        products: computed(()=> data.value?.products || []),
        totalPages: computed(()=> data.value?.totalPages || 0),
        currentPage: computed(()=> data.value?.currentPage || 1),
        perPage: computed(()=> data.value?.perPage || 10),
        total: computed(()=> data.value?.total || 0 ),

        //Actions
        error,
        status,
        execute,
        pending

    }
}