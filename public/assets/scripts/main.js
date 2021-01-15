import firebase from './firebase-app'

const body = document.querySelector('body');
const btnOpen = document.getElementById('btn-open');
const closeMenu = document.querySelectorAll('[data-close ="menu"]');
const menuLinks = document.querySelectorAll('.menu a');
const menu = document.querySelector('#header .menu');
const btnLogged = menu.querySelector("#header .menu .footer button")
const auth = firebase.auth()

if(btnLogged) {

    btnLogged.addEventListener('click', e => {

        auth.signOut().then(() => {



        }).catch(err => console.error(err))

    })

}

if(menu) {

    const auth = firebase.auth();

    auth.onAuthStateChanged(user => {

        if(user) {

            const userElement = menu.querySelector(".footer > div > div")

            userElement.querySelector("strong").innerHTML = user.displayName
            userElement.querySelector("small").innerHTML = user.email

            menu.classList.add('logged')

        } else {

            menu.classList.remove('logged')

        }

    })

}

if(btnOpen){

    btnOpen.addEventListener('click', e => {

        body.classList.add('open-menu')// abre o menu
                        //remove() fechar o menu
                        //toggle() abrir e fechar menu

    })

}

if(closeMenu){

    closeMenu.forEach(el => {

        el.addEventListener('click', e => {
    
            body.classList.remove('open-menu')
    
        })

    })

}

if(menuLinks){

    menuLinks.forEach(el => {

        el.addEventListener('click', e => {
    
            body.classList.remove('open-menu')
    
        })

    })

}