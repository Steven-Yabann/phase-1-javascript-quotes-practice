function overallFunc (){
    document.addEventListener('DOMContentLoaded', () => {
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then((res) => res.json())
        .then((data) => renderData(data))
    })}
    
function renderData(contents){
    let quotesUl = document.getElementById('quote-list')
    contents.forEach(content => {
        let quoteLi = document.createElement('li')
        quoteLi.createElement= 'quote-card'
        quoteLi.innerHTML= `
        <blockquote class="blockquote">
        <p class="mb-0">${content.quote}</p>
        <footer class="blockquote-footer">${content.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${content.likes.length}</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>`
        quotesUl.appendChild(quoteLi) 
        
        let deleteBtns = document.querySelectorAll('.btn-danger')
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener('click', () => {
                console.log('delete')
                fetch(`http://localhost:3000/quotes/${content.id}`, {
                    method : 'DELETE'
                })
            })
            
        let likeBtns = document.querySelectorAll('.btn-success')
        let Vts = content.likes.length
            
            likeBtns.forEach((btn) => {
            btn.addEventListener('click', (event) => {
            Vts++
            let votes = event.target.querySelector('span')
            votes.textContent = Vts
            fetch('http://localhost:3000/likes', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    quoteId: `${content.id}`
                    })
                } )
            })
        })
        })
    })
        
        let form = document.getElementById('new-quote-form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            let quoteIn = e.target.quote.value
            let authIn = e.target.author.value
            console.log(quoteIn, authIn );
            fetch('http://localhost:3000/quotes', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    quote : `${quoteIn}`,
                    author : `${authIn}`
                })
            })   
        }) 
    }
        
    
    
overallFunc()