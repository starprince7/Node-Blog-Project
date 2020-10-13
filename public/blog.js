const sideBar = document.querySelector('.mobile-nav');

const toggle = () => {
    sideBar.classList.toggle('active')
}



/**================================ Ajax request to Delete Comments And POSTS=================== */
const btn = document.getElementById('delete-btn');
const postId = document.getElementById('post-id').textContent;
const blog_delete = document.getElementById('blog-delete-btn')

blog_delete.addEventListener('click', async (e) => {
    e.preventDefault;

    try {
        const res = fetch(`/blog/${postId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
            .then(data => window.location.href = data.redirect)
    }
    catch (error) {
        console.log(error)
    }

})



/**================================ Ajax request to Delete Comments from posts=================== */

const deleteFunc = async () => {


    let endPoint = `/comments/${postId}/${btn.dataset.prince}`
    alert(endPoint)
    try {
        const response = await fetch(endPoint, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)
        if (data) {
            document.location.reload();
        }
    }
    catch (err) {
        console.log(err)
    }

}
/*===========WARNING! NO OTHER CODE SHOULD GO DOWN BELOW, HERE (UNCAUGHT SYNTAX ERROR) WRITE ALL ABOVE THE "DELETE AJAX REQUEST" ============= */


