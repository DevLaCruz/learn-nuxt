const { createApp, ref} = Vue;

const app = createApp({
    // template: `
    // <div>
    //     <h1>Vue 3 - Composition API</h1>
    //     <p>{{ message }}</p>
    //     <p>{{ company }}</p>
    //     <p>Counter: {{ counter }}</p>
    //     <button @click="increment">Increment</button>
    // </div>
    // `,

    setup() {

        const message = ref('I am Alejandro');
        const company  = ref('Axtosys');

        const changeMessage = () => {
            message.value = 'I am Alejandro De La Cruz';
            company.value = 'Axtosys Corporation';
        }

        // setTimeout(() => {
        //     message.value = 'I am Alejandro De La Cruz';
        //     company.value = 'Axtosys Corporation';
        // }, 4000);

        const counter = ref(0);

        function increment() {
            counter.value++;
        }

        return {
            message,
            company,
            counter,
            increment,
            changeMessage
        };
    }
});

app.mount('#app');

//console.log(Vue);
