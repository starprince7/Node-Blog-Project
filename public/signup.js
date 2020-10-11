/**================================ **SignUp!** Ajax request submission=================== */

const form = document.getElementById('signup-form')
const emailError = document.querySelector('.email.error')
const usernameError = document.querySelector('.username.error')
const passwordError = document.querySelector('.password.error')

form.addEventListener('submit', async (e)=> {
    e.preventDefault();

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
        console.log(data.refinedError)
        console.log(data)
        if(data.refinedError) {
            // set email & password errors
            emailError.textContent = data.refinedError.email
            usernameError.textContent = data.refinedError.username
            passwordError.textContent = data.refinedError.password
        }

        if(data.user) {
            location.assign('/create')
        }
    }
    catch(err) {
        console.log(err)
    }
})


