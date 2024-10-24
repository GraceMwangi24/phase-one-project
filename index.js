//base url
const baseUrl = "http://localhost:3000";

// Function to collect data from the userS
    function collectProducts() {   
    const form = document.querySelector("form");
    form.addEventListener('submit', (event)=>{
        event.preventDefault(); 
        const formData = {
            productname: event.target.productname.value,
            quantity: event.target.quantity.value,
            category: event.target.category.value 

        };
        form.reset();
        console.log (formData);
        
        postProducts(formData);
    }
    )

    }
    collectProducts();


    // POST request 
function  postProducts (formData) {
    fetch(`${baseUrl}/products`, { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify(formData)  
    })
    .then(response => response.json())  
    .then(data => {
        console.log(data); 
        fetchProducts(); 
    })
}


//GET request
function fetchProducts() {
    fetch(`${baseUrl}/products`)
    .then (response => response.json())
    .then(data => {
        const tableBody =document.querySelector('tbody');
        data.forEach(item => {
        displayProducts(item)
    });
})
}
//fetchProducts()


function displayProducts(item){
    const tableBody = document.querySelector('#tbody')
    const row = document.createElement('tr')
    row.innerHTML= `<th scope="row">1</th>
        <td>${item.id}</td>
        <td>${item.productname}</td>
        <td>${item.quantity} </td>
        <td>${item.category}</td>
        <td>
          <button type="button" class="btn btn-warning">Edit</button>
          <button type="button" class="btn btn-danger">Delete</button>
          </td>
    `
    tableBody.appendChild(row)

}

fetchProducts();
