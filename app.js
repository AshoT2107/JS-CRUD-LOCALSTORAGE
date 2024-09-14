const inputs = document.querySelectorAll("body [name]");
const products = JSON.parse(localStorage.getItem("products")) || [];
const tbody = document.getElementById("products");
let productIndex = -1;

const render = () => {
  tbody.innerHTML = "";
  products.forEach((product, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.count.toLocaleString()}</td>
        <td>${parseInt(product.price).toLocaleString()}</td>
        <td>${(product.price * product.count).toLocaleString()} so'm</td>
        <td><button onclick="editProduct(${index})">E</button></td>
        <td><button onclick="removeProduct(${index})">X</button></td>

      </tr>
    `;
  });
};

render();

const removeProduct = (index) => {
  if (confirm("Qaroringiz qat'iymi?")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    render();
  }
};

const editProduct = (index) => {
  productIndex = index;
  for (const key in products[index]) {
    document.querySelector(`[name = ${key}]`).value = products[index][key];
  }
};

let check = true;

const add = () => {
  const product = {};
  inputs.forEach((inp) => {
    if (inp.value.length == 0) check = false;
    product[inp.getAttribute("name")] = inp.value;
    inp.value = "";
  });

  if (check) {
    if (productIndex == -1) {
      products.push(product);
    } else {
      products[productIndex] = product;
    }
    localStorage.setItem("products", JSON.stringify(products));
    render();
  } else {
    alert("Barcha maydonlarni to'ldiring!");
    check = true;
  }
};
