export const useAdminProduct = async (id: string) => {

    const {data, error, status, execute, refresh, pending} = await useFetch(
        `/api/admin/product/${id}`
    )


    const createOrUpdate = (data: Partial<Product>, files?: File[]) => {
        const isCreating = data.id === 0

    
    }

    return{

    }
}