
/**================================ **Login!** Ajax request submission=================== */

const loginForm = document.getElementById('login-form')
const loginEmailError = document.querySelector('.email.error')
const loginPasswordError = document.querySelector('.password.error')

loginForm.addEventListener('submit', async (e)=> {
    e.preventDefault();

    // reset All error fields
    loginEmailError.textContent = ''
    loginPasswordError.textContent = ''

    //Getting the input fields here!
    const email_login = loginForm.email.value
    const password_login = loginForm.password.value

    try{
        const result = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({email_login, password_login}),
            headers: {'Content-Type': 'application/json'}
        })
        
        const data = await result.json();
        console.log('check',data.refinedError)
        console.log(data)
        if(data.refinedError) {
            // set email & password errors
            loginEmailError.textContent = data.refinedError.email
            loginPasswordError.innerHTML = data.refinedError.password
        }

        if(data.user) {
            location.assign('/create')
        }
    }
    catch(err) {
        console.log(err)
    }
})

