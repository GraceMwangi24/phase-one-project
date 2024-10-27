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

        if (form.dataset.editing) {
            const id = form.dataset.editing; 
            updateProduct(id, formData); 
        } else {
            postProducts(formData); 
        } 
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
        clearForm();
    })
}
fetchProducts();

//GET request
function fetchProducts() {
    fetch(`${baseUrl}/products`)
    .then (response => response.json())
    .then(data => {
        const tableBody =document.querySelector('tbody');
        tableBody.innerHTML ='';
        data.forEach(item => {
        displayProducts(item)
    });
})
}
//fetchProducts()


function displayProducts(item){
    const tableBody = document.querySelector('#tbody')
    const row = document.createElement('tr')
    row.innerHTML= `<th scope="row">${item.id}</th>
        <td>${item.productname}</td>
        <td>${item.quantity} </td>
        <td>${item.category}</td>
        <td>
          
           <button type="button" class="btn btn-warning editBtn" data-id="${item.id}">Edit</button>

          <button type="button" class="btn btn-danger deleteBtn" data-id="${item.id}">Delete</button>

          </td>
    `
    tableBody.appendChild(row)
    const deleteBtn = row.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => deleteProduct(item.id, row));
    const editBtn = row.querySelector('.editBtn');
    editBtn.addEventListener('click', () => populateEditForm(item))
}

fetchProducts();
// PUT REQUEST 
function updateProduct(id, formData) {
    fetch(`${baseUrl}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Product updated:', data);
        fetchProducts(); // Refresh the product list
        clearForm(); // Clear form after update
    })
    .catch(error => console.error('Error updating product:', error));
}

function populateEditForm(item) {
    const form = document.querySelector("form");
    form.productname.value = item.productname;
    form.quantity.value = item.quantity;
    form.category.value = item.category;


    form.dataset.editing = item.id; 
}

// Clear the form after editing
function clearForm() {
    const form = document.querySelector("form");
    form.reset();
    delete form.dataset.editing; 
}

//DELETE REQUEST
function deleteProduct(id, row) {
    // Make a DELETE request
    fetch(`${baseUrl}/products/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            row.remove();
            console.log(`Product with ID ${id} deleted successfully.`);
        } else {
            console.error('Error deleting product:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
//