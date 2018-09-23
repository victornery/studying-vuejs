let app = new Vue({
    el: '#app',
    data: {
        message: 'Olá, Vue!'
    }
});

let app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'Você carregou esta página em ' + new Date().toLocaleString()
    }
});

let app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});

let app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'Aprender Javascript' },
            { text: 'Aprender Vue' },
            { text: 'Aprender algo incrível!' }
        ]
    }
});

let app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Quinta classe Vue!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('');
        }
    }
});
let app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Testando two-way binding!'
    }
})

/* Iniciando componentização Vue */

Vue.component('my-nav', {
    props: {
        message: {
            type: String,
            default: `App Title`
        },
    },
    template: `<nav> <button v-on:click="$emit('toggle')">#</button> {{ title }} e {{ message }}</nav>`,
    data: () => {
        return {
            title: `My beautiful nav!`
        }
    }
});

Vue.component('my-aside', {
    template: `<aside v-html="title">{{ title }}</aside>`,
    data: () => {
        return {
            title: `My <strong>very beautify</strong> aside!`
        }
    }
})

Vue.component('my-main', {
    template: `<main>Meu componente main <my-section></my-section> </main>`
});

Vue.component('my-section', {
    template: `<section :style="style">Meu componente my-section!</section>`,
    data: () => {
        return {
            style: {
                background: `red`
            }
        }
    }
})

let app7 = new Vue({
    el: '#app-7',

    data: {
        message: 'teste',
        open: false
    },

    methods: {
        update() {
            this.open = !this.open;
        }
    }
})