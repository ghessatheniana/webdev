const minusButton = document.querySelectorAll(".minus");
const plusButton = document.querySelectorAll(".plus");
const inputField = document.querySelectorAll(".quantity");
const selectedProducts = [];
const taxRate = 0.11; // Pajak 11%

let value = []

for(let i = 0; i < plusButton.length; i++){
    value.push(0)
}

minusButton.forEach((element, i) => {
    element.addEventListener("click", function() {
        value[i]--;
        inputField[i].textContent = value[i];
    });
});

plusButton.forEach((element, i) => {
    element.addEventListener("click", function() {
        value[i]++;
        inputField[i].textContent = value[i];
    });
});

// Cart List
// Function untuk mengupdate tampilan Cart List
function updateCart() {
    const selectedProductsList = document.querySelector('.selected-products');
    const cartSummary = document.querySelector('.cart-summary');
    let subtotal = 0;
  
    // Menghapus isi sebelumnya dari Cart List
    selectedProductsList.innerHTML = '';
  
    // Mengisi Cart List dengan produk yang dipilih
    selectedProducts.forEach((product) => {
      const listItem = document.createElement('li');
      listItem.classList.add('selected-product');
  
      // Menampilkan gambar produk
      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = product.name;
      listItem.appendChild(productImage);
  
      // Menampilkan informasi produk
      const productInfo = document.createElement('div');
      productInfo.classList.add('product-info');
  
      const productName = document.createElement('h4');
      productName.textContent = product.name;
      productInfo.appendChild(productName);
  
      const productQuantity = document.createElement('p');
      productQuantity.textContent = `Jumlah Pesanan: ${product.quantity}`;
      productInfo.appendChild(productQuantity);
  
      const productPrice = document.createElement('p');
      productPrice.textContent = `Harga: $${product.price}`;
      productInfo.appendChild(productPrice);
  
      listItem.appendChild(productInfo);
      selectedProductsList.appendChild(listItem);
  
      // Menghitung subtotal
      subtotal += product.quantity * product.price;
    });
  
    // Menghitung pajak dan total bayar
    const taxAmount = subtotal * taxRate;
    const totalAmount = subtotal + taxAmount;
  
    // Menampilkan rincian pembelian pada Cart List
    cartSummary.innerHTML = `
      <div class="cart-details">
        <div class="subtotal">
          <p>Subtotal:</p>
          <p>$${subtotal.toFixed(2)}</p>
        </div>
        <div class="tax">
          <p>Pajak (11%):</p>
          <p>$${taxAmount.toFixed(2)}</p>
        </div>
        <div class="total">
          <p>Total Bayar:</p>
          <p>$${totalAmount.toFixed(2)}</p>
        </div>
        <div class="tombol mt-2">
          
        </div>
      </div>
    `;
}
  
  // Event listener untuk tombol "Tambahkan" pada setiap produk
const addToCartButtons = document.querySelectorAll('.btn-success');
addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Dapatkan informasi produk yang berbeda dari produk yang diklik
    const productImage = document.querySelectorAll('.product img')[index].src;
    const productName = document.querySelectorAll('.product h3')[index].textContent;
    const productPrice = document.querySelectorAll('.product .price')[index].textContent;
    const productQuantity = value[index]; // Jumlah pesanan sesuai dengan yang diinputkan
    
    // Simpan data produk yang dipilih ke dalam variabel selectedProducts
    const product = {
      name: productName,
      image: productImage,
      price: parseFloat(productPrice.replace('$', '')), // Mengambil angka dari harga
      quantity: productQuantity,
    };
  
    selectedProducts.push(product);
  
    // Perbarui tampilan Cart List
    updateCart();
  });
});

  // Panggil fungsi pertama kali untuk menampilkan Cart List awal
  updateCart();

  // Invoic
function printInvoice(){
  const getInvoice = document.getElementById("invoice")
  getInvoice.innerHTML = '';
  let total = 0;

  selectedProducts.forEach((product) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add('row');

    rowDiv.innerHTML = `
        <div class="col-md-8">
          <div class="row">${product.name}</div>
          <div class="row">
          <p><span>$${product.price}</span> x <span>${product.quantity}</span></p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="row">
            $${product.price * product.quantity}
          </div>
        </div>`;

        getInvoice.appendChild(rowDiv);

        total += product.price * product.quantity
      });

    const totalPrice = total;
    const tax = totalPrice * 0.11;
    const totalPayment = totalPrice + tax;

    const getPayment = document.getElementById("total-eca")
    getPayment.innerHTML = '';
    const price = document.createElement("div");
    price.classList.add('row');

    price.innerHTML = `
      <div class="total">
        <p><b>Subtotal:</b></p>
        <p class="text-end " id="subtotal">$${totalPrice}</p> 
      </div>
      <div class="tax">
        <p><b>Pajak (11%):</b></p>
        <p id="taxtotal">$${tax}</p> 
      </div>
      <div class="total">
        <p><b>Total Bayar:</b></p>
        <p id="totalprice">$${totalPayment}</p> 
      </div>
        `;
    
        getInvoice.appendChild(price);

}

// function totalPayment(){
//   const subtotal = document.getElementById('subtotal');
//   const tax = document.getElementById('taxtotal');
//   const price = document.getElementById('totalprice');


//   subtotal.textContent = 
// }
  // Event listener untuk tombol "Check Out"
// const checkOutButton = document.querySelector('.btn-success[data-bs-target="#strukModal"]');
// checkOutButton.addEventListener('click', function () {
//   const strukContent = document.querySelector('.modal-body .struk-content');
  
//   // Menghapus isi sebelumnya dari modal struk
//   strukContent.innerHTML = '';
  
//   // Mengisi modal struk dengan data dari "Cart List"
//   selectedProducts.forEach((product) => {
//     const productItem = document.createElement('div');
//     productItem.classList.add('produk-item');

//     const productName = document.createElement('h4');
//     productName.textContent = product.name;
//     productItem.appendChild(productName);

//     const productQuantity = document.createElement('p');
//     productQuantity.textContent = `Jumlah Pesanan: ${product.quantity}`;
//     productItem.appendChild(productQuantity);

//     const productPrice = document.createElement('p');
//     productPrice.textContent = `Harga: $${(product.price * product.quantity).toFixed(2)}`;
//     productItem.appendChild(productPrice);

//     strukContent.appendChild(productItem);
//   });
  
//   // Menghitung subtotal, pajak, dan total bayar
//   let subtotal = selectedProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
//   const taxAmount = subtotal * taxRate;
//   const totalAmount = subtotal + taxAmount;
  
//   // Menambahkan subtotal, pajak, dan total bayar ke modal struk
//   const strukSummary = document.createElement('div');
//   strukSummary.classList.add('struk-summary');
//   strukSummary.innerHTML = `
//     <div class="subtotal">
//       <p>Subtotal:</p>
//       <p>$${subtotal.toFixed(2)}</p>
//     </div>
//     <div class="tax">
//       <p>Pajak (11%):</p>
//       <p>$${taxAmount.toFixed(2)}</p>
//     </div>
//     <div class="total">
//       <p>Total Bayar:</p>
//       <p>$${totalAmount.toFixed(2)}</p>
//     </div>
//   `;
//   strukContent.appendChild(strukSummary);
// });


const btnCheckOut = document.getElementById('btn-checkOut');

btnCheckOut.addEventListener("click", ()=> {
  printInvoice()
})
