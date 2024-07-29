
console.log("Conexión establecida");

const SOCKET = io();
const FORM = document.getElementById("form");

SOCKET.on("connect", () => {
    console.log("Conectado al Server");
});


SOCKET.on("products", (products) => {
    const TBODY = document.getElementById("tbody");
    TBODY.innerHTML = ""; 

    let rowsHTML = ""; 

    if (products && products.productsFound && Array.isArray(products.productsFound.docs)) {
        products.productsFound.docs.forEach((product) => {
            const availabilityIcon = product.available
                ? '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" color="green" class="bi bi-check2 available" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" color="red" class="bi bi-x-lg available" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>';

            rowsHTML += `
                <tr>
                    <td id="${product._id}">${product.code}</td>
                    <td id="${product._id}">${product.category}</td>
                    <td id="${product._id}">${product.title}</td>
                    <td id="${product._id}"><a href="${product.thumbnail[0]}" target="_blank">${product.thumbnail[0]}</a></td>
                    <td id="${product._id}">${product.price}</td>
                    <td id="${product._id}">${product.stock}</td>
                    <td><a id="${product._id}">${availabilityIcon}</a></td>
            
                </tr>
            `;
        });
    } else {
        console.log("Received products is null or not an array", products);
    }

    TBODY.innerHTML = rowsHTML;

    document.querySelectorAll(".delete").forEach((button) => {
        button.addEventListener("click", function() {
            const productId = this.getAttribute("id");
            SOCKET.emit("delete-product", productId);
        });
    });

    document.querySelectorAll(".available").forEach((button) => {
        button.addEventListener("click", function() {
            const productId = this.getAttribute("id");
            SOCKET.emit("toggle-availability", productId);
        });
    });
});

FORM.addEventListener("submit", function(event) {
    event.preventDefault();

    const FILE = document.getElementById("file").value;
    const CODE = document.getElementById("code").value;
    const CATEGORY = document.getElementById("category").value;
    const TITLE = document.getElementById("title").value;
    const PRICE = document.getElementById("price").value;
    const STOCK = document.getElementById("stock").value;
    const DESCRIPTION = document.getElementById("description").value;


    const product = {
        code: CODE,
        category: CATEGORY,
        title: TITLE,
        description: DESCRIPTION,
        price: Number(PRICE),
        stock: Number(STOCK),
        thumbnail: [FILE],
        available: true,
    };
    console.log(FILE);
    SOCKET.emit("add-product", product);
    FORM.reset();
});

SOCKET.on("disconnect", () => {
    console.log("Se desconecto el server");
});