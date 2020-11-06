/**================================ **SignUp!** Ajax request submission=================== */

const form = document.getElementById('signup-form')
const emailError = document.querySelector('.email.error')
const usernameError = document.querySelector('.username.error')
const passwordError = document.querySelector('.password.error')
const loader2 = document.querySelector('.display-loader__two')

form.addEventListener('submit', async (e)=> {
    e.preventDefault();
    loader2.style.display = 'block'

    // reset All error fields
    emailError.textContent = ''
    usernameError.textContent = ''
    passwordError.textContent = ''

    const email = form.email.value
    const username = form.username.value
    const password = form.password.value

    try{
        const result = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({email, username, password}),
            headers: {'Content-Type': 'application/json'}
        })
        
        const data = await result.json();
        /* console.log(data.refinedError)
        console.log(data) */
        if (data.refinedError) {
            loader2.style.display = 'none'
            // set email & password errors
            emailError.textContent = data.refinedError.email
            usernameError.textContent = data.refinedError.username
            passwordError.textContent = data.refinedError.password
        }

        if (data.user) {
            loader2.style.display = 'none'
            location.assign('/create')
        }
    }
    catch(err) {
        console.log(err)
    }
})


