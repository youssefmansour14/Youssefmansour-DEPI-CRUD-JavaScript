var products = JSON.parse(sessionStorage.getItem('products')) || [];
function saveProducts() {
    sessionStorage.setItem('products', JSON.stringify(products));
}

function renderProducts() {
    var productTable = document.getElementById('productTable');
    productTable.innerHTML = '';
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var row = `
            <tr>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.details}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="startEditProduct(${i})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
                </td>
            </tr>
        `;
        productTable.innerHTML += row;
    }
}

function addProduct() {
    var name = document.getElementById('productName').value;
    var price = document.getElementById('productPrice').value;
    var details = document.getElementById('productDetails').value;

    if (name && price && details) {
        products.push({ name: name, price: price, details: details });
        saveProducts();
        renderProducts();
        clearForm();
    }
}

function startEditProduct(index) {
    editingIndex = index;
    var product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDetails').value = product.details;

    var actionButton = document.getElementById('productActionButton');
    actionButton.textContent = 'Update Product';
    actionButton.onclick = updateProduct;
}

function updateProduct() {
    var name = document.getElementById('productName').value;
    var price = document.getElementById('productPrice').value;
    var details = document.getElementById('productDetails').value;

    if (name && price && details && editingIndex !== null) {
        products[editingIndex] = { name: name, price: price, details: details };
        saveProducts();
        renderProducts();
        clearForm();

        var actionButton = document.getElementById('productActionButton');
        actionButton.textContent = 'Add Product';
        actionButton.onclick = addProduct;
        editingIndex = null;
    }
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    renderProducts();
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDetails').value = '';
}

renderProducts();
