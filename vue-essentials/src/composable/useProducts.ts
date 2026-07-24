import {ref} from "vue";

export const useProducts = () => {
    const products = ref([
        {
            id: 1,
            name: 'Shirt',
            quantity: 10,
        },
        {
            id: 2,
            name: 'Pants',
            quantity: 20,
        },
        {
            id: 3,
            name: 'Nose',
            quantity: 4,
        }
    ]);

    function handleIncrementQuantity(productId: number) {
        const product = products.value.find((product)=>product.id===productId)

        if (!product) return;
        product.quantity++;

        //product.value.quantity++;
    }

    function handleDecrementQuantity(productId:number){
        const product = products.value.find((product)=>product.id===productId)

        if (!product) return;
        if (product.quantity === 9) return;
        product.quantity--;

        //product.value.quantity--;
    }
    return{
        //props
        products,

        //Methods
        handleIncrementQuantity,
        handleDecrementQuantity,
    }
}