import Vue from 'vue'
import App from './App.vue'
// import * as firebase from 'firebase'
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import scrollAnimation from './scroll-animation-dole-gore';
import scrollAnimationSlow from './scroll-animation-dole-gore-slow';
import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'


export const bus = new Vue();

Vue.directive('scroll-animation-dole-gore', scrollAnimation)
Vue.directive('scroll-animation-dole-gore-slow', scrollAnimationSlow)
Vue.use(SequentialEntrance); //animacije na pocetku
Vue.use(require('vue-shortkey')) //za dugmice f1,f2 i bilo koje drugo plugin

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

var filter = function(text, length, clamp) {
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    var content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);


Vue.config.productionTip = false

firebase.initializeApp({
    apiKey: 'AIzaSyBweZCJT4pV_HTSURirc0t_y7a6-_v4KtY',
    authDomain: 'farmakon-ff747.firebaseapp.com',
    databaseURL: 'https://farmakon-ff747.firebaseio.com',
    projectId: 'farmakon-ff747',
    storageBucket: 'farmakon-ff747.appspot.com',
    messagingSenderId: '733291581346',
    appId: '1:733291581346:web:ef2ade8d16ed619dd42cfb',
    measurementId: 'G-9F4QQLJXWK'
})

let LoggedInCheck; //proveri da li je neko logovan, ako jeste onda napravi Vue instancu i ispisi njegov mail
//(da kada se refresh strana..prvo ne prikaze dugme login i register vec odmah logout i ispise email korisnika)
//U Navbar.vue ima beforeCreate gde na svaku promenu u autoritizaciji pa cak i za register ako se pojavi "user" on loguje automatski i posle registracije tj na svaki refresh u autoritizaciji
firebase.auth().onAuthStateChanged(() => {
    if (!LoggedInCheck) {
        LoggedInCheck =
            new Vue({
                router,
                store,
                vuetify,
                render: h => h(App)
            }).$mount('#app')
    }
})