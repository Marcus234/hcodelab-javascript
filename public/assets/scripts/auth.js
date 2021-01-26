import firebase from './firebase-app'
import { getFormValues, getQueryString, hideAlertError, showAlertError } from './utils';

const authPage = document.querySelector('main#auth');

if(authPage){

    const auth = firebase.app();

    const hideAuthForms = () => {

        document.querySelectorAll("#auth form")
        .forEach( el => el.classList.add('hide'))

    }

    const showAuthForm = id => {

        document.getElementById(id).classList.remove('hide')

    }

    const authHash = id => {

        hideAuthForms()

        if(sessionStorage.getItem('email')){

            document.querySelectorAll('[name=email]')
            .forEach(el => el.value = sessionStorage.getItem('email'))

        }

        switch(window.location.hash){

            case '#register' :
                showAuthForm('register')
                break

            case '#login' :
                showAuthForm('login')
                break

            case '#forget' :
                showAuthForm('forget')
                break

            case '#reset' :
                showAuthForm('reset')
                break

            default :

                const params = getQueryString()

                if (params.mode === 'resetPassword') {

                    showAuthForm('reset')

                } else {

                    //showAuthForm('auth-email')
                showAuthForm('login')

                }

        }

    }

    window.addEventListener('load', e => {

        authHash()

    })

    window.addEventListener('hashchange', e => {

        authHash()

    })

    const formAuthEmail = document.querySelector("#auth-email")

    formAuthEmail.addEventListener('submit', e => {

        e.preventDefault()
        //e.stopPropagation() - para a propagação, clica uma vez e acabou

        const btnSubmit = e.target.querySelector('[type=submit]')

        btnSubmit.disabled = true

        sessionStorage.setItem('email', formAuthEmail.email.value)
        location.hash = '#login'
        btnSubmit.disabled = false

    })
    
    const formAuthRegister = document.querySelector("#register")

    formAuthRegister.addEventListener("submit", e => {

        e.preventDefault()

        hideAlertError(formAuthRegister)

        //console.log(getFormValues(formAuthRegister))

        const values = getFormValues(formAuthRegister)

        auth
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(response => {

                const { user } = response

                user.updateProfile({

                    displayName: values.name

                })

                window.location.href = "/"

            })
            .catch(showAlertError(formAuthRegister))

    })

    const formAuthLogin = document.querySelector("#login")

    formAuthLogin.addEventListener("submit", e => {

        e.preventDefault()

        hideAlertError(formAuthLogin)

        const values = getFormValues(formAuthLogin)

        auth
            .signInWithEmailAndPassword(values.email, values.password)
            .then(response => {
                
                const values = getQueryString()

                if (values.url) {

                    window.location.href = `http://localhost:8080${values.url}`

                } else {

                    window.location.href = "/"

                }
            
            })
            .catch(showAlertError(formAuthLogin))

    })

    const formForget = document.querySelector('#forget')

    formForget.addEventListener('submit', e => {

        e.preventDefault()

        const btnSubmit = formForget.querySelector('[type=submit]');
        const message = formForget.querySelector('.message');
        const field = formForget.querySelector('.field');
        const actions = formForget.querySelector('.message');

        hideAlertError(formForget)

        const values = getFormValues(formForget)

        message.style.display = "none";

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = "Enviando...";

        auth
            .sendPasswordResetEmail(values.email)
            .then(() => {

                field.style.display = 'none';
                actions.style.display = 'none';
                message.style.display = "block";

            })
            .catch((error) => {

                field.style.display = 'none';
                actions.style.display = 'none';
                showAlertError(formForget)(error);

            })
            .finally(() => {

                btnSubmit.disabled = false;
                btnSubmit.innerHTML = "Enviar";

            })

        })

}