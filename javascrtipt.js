document.addEventListener("DOMContentLoaded", function() {
    var cartBoughtElement = document.getElementById("bought-products-basket");
    var cartRemainedElement = document.getElementById("remaining-products-basket");
    var addProductButton = document.getElementById("add-product-button");
    var addButtons = document.getElementsByClassName("add-item");
    var removeButtons = document.getElementsByClassName("remove-item");
    var boughtButtons = document.getElementsByClassName("bought");
    var notBoughtButtons = document.getElementsByClassName("not-bought");
    var cancelButtons = document.getElementsByClassName("cancel-button");
    var remainingProductsBasket = document.getElementById("remaining-products-basket");
    var productNames = document.querySelectorAll("[data-attribute='not-sold'] .product-name");

    addProductButton.addEventListener("click", function () {
      var productNameTextField = document.getElementById("product-name-textfield");
      var productName = productNameTextField.value.trim();
    
      if (productName !== "") {
        var existingProduct = document.querySelector(".product-option[name='" + productName + "']");
        if (existingProduct) {
          alert("Product with the same name already exists!");
          return; 
        }
    
        var productsContainer = document.getElementById("products");
        var newProductOption = document.createElement("div");
        
        newProductOption.className = "product-option";
        newProductOption.setAttribute("name", productName);
        newProductOption.setAttribute("data-attribute", "not-sold");
        newProductOption.setAttribute("amount-attribute", "more-than-one");
        newProductOption.innerHTML = `
          <p class="product-name">${productName}</p>
          <section class="options">
            <button type="button" class="remove-item" data-tooltip="Зменшити кількість">-</button>
            <span class="amount">1</span>
            <button type="button" class="add-item" data-tooltip="Збільшити кількість">+</button>
          </section>
          <section class="buy-unbuy">
            <button type="button" class="bought" data-tooltip="Купити">Куплено</button>
            <button type="reset" class="cancel-button" data-tooltip="Видалити продукт">x</button>
          </section>
        `;
    
        productsContainer.appendChild(newProductOption);
        newProductOption.querySelector(".remove-item").addEventListener("click", removeButtonsListener);
        newProductOption.querySelector(".add-item").addEventListener("click", addButtonsListener);
        newProductOption.querySelector(".bought").addEventListener("click", boughtButtonListener);
        newProductOption.querySelector(".cancel-button").addEventListener("click", cancelButtonListener);

        var newProductName = newProductOption.querySelector("[data-attribute='not-sold'] .product-name");
        newProductName.addEventListener("click", productNameListener);

        var productOptionHeight = newProductOption.offsetHeight;
        var productsContainer = document.getElementById("products");
        var productsContainerHeight = productsContainer.offsetHeight;
        productsContainer.style.height = (productsContainerHeight + productOptionHeight) + "px";
        productsContainer.style.minHeight = (productsContainerHeight + productOptionHeight) + "px";
    
        var remainingProductsBasket = document.getElementById("remaining-products-basket");
        var productItem = document.createElement("span");
        productItem.className = "product-item";
        productItem.id = productName;
        productItem.innerHTML = `
          <p class="${productName}">${productName}</p>
          <span class="amount-in-cart">1</span>
        `;
    
        remainingProductsBasket.appendChild(productItem);
    
        productNameTextField.value = "";
      }
    });

    function addButtonsListener() {
      var amountElement = this.parentNode.querySelector(".amount");
        var amount = parseInt(amountElement.textContent);
        amount++;
        amountElement.textContent = amount;
        if (amount > 1) {
            this.parentNode.parentNode.removeAttribute("amount-attribute", "more-than-one");
        }
        var productName = null
        try {
          productName = this.parentNode.parentNode.querySelector(".product-name").textContent;
        } catch (nullPointerException) {
          productName = this.parentNode.parentNode.querySelector(".personal-option").value;
        }
        document.getElementById(productName).querySelector(".amount-in-cart").textContent=amount;
    }

    function removeButtonsListener() {
      var amountElement = this.parentNode.querySelector(".amount");
        var amount = parseInt(amountElement.textContent);
        if (amount > 1) {
          amount--;
          amountElement.textContent = amount;
        }
        if (amount == 1) {
            this.parentNode.parentNode.setAttribute("amount-attribute", "more-than-one");
        }
        var productName = null
        try {
          productName = this.parentNode.parentNode.querySelector(".product-name").textContent;
        } catch (nullPointerException) {
          productName = this.parentNode.parentNode.querySelector(".personal-option").value;
        }
        document.getElementById(productName).querySelector(".amount-in-cart").textContent=amount;
    }

    function cancelButtonListener() {
      var productOptionHeight = this.parentNode.parentNode.offsetHeight;
    
      var productOption = this.parentNode.parentNode;
      productOption.parentNode.removeChild(productOption);
      var productName = null;
      try {
        productName = this.parentNode.parentNode.querySelector(".product-name").textContent;
      } catch (nullPointerException) {
        productName = productOption.querySelector(".personal-option").value;
      }
    
      var productsContainer = document.getElementById("products");
      var productsContainerHeight = productsContainer.offsetHeight;
      productsContainer.style.height = (productsContainerHeight - productOptionHeight) + "px";
      productsContainer.style.minHeight = (productsContainerHeight - productOptionHeight) + "px";
    
      var productItemToRemove = remainingProductsBasket.querySelector("#" + productName);
      if (productItemToRemove) {
        remainingProductsBasket.removeChild(productItemToRemove);
      }
    }
    
    
    function boughtButtonListener() {
      this.textContent = "Не куплено";
      this.className = "not-bought";
      this.id = "not-bought";
      this.setAttribute("data-tooltip", "Відмінити покупку");
      this.removeEventListener("click", boughtButtonListener);
      this.addEventListener("click", notBoughtButtonListener);

      var productOption = this.parentNode.parentNode;

      productOption.setAttribute("data-attribute", "sold");

      var buyUnbuySection = productOption.querySelector(".buy-unbuy");
      buyUnbuySection.classList.remove("not-bought");

      var cancelButton = productOption.querySelector(".cancel-button");
      cancelButton.parentNode.removeChild(cancelButton);
      var productName = null;
      try 
      {
        productName = this.parentNode.parentNode.querySelector(".product-name").textContent;
      } catch (nullPointerException) {productName = productOption.querySelector(".personal-option").value;
    }
    var amount = this.parentNode.parentNode.querySelector(".amount").textContent;

    var newProductItem = document.createElement("span");
    newProductItem.classList.add("product-item");
    newProductItem.id = productName;
    newProductItem.innerHTML = " <p class='"+productName+"'>"+productName+"</p>\n<span class='amount-in-cart id='" + productName + "'>" + amount + "</span>";

    cartBoughtElement.appendChild(newProductItem);

    this.parentNode.parentNode.querySelector(".product-name").removeEventListener('click', productNameListener)

    var productItemToRemove = remainingProductsBasket.querySelector("#" + productName);
    if (productItemToRemove) {
      remainingProductsBasket.removeChild(productItemToRemove);
    }
  }

  function notBoughtButtonListener() {
    this.textContent = "Куплено";
    this.className = "bought";
    this.id = "bought";
    this.setAttribute("data-tooltip", "Купити");
    this.removeEventListener("click", notBoughtButtonListener);
    this.addEventListener("click", boughtButtonListener);

    var productOption = this.parentNode.parentNode;

    productOption.setAttribute("data-attribute", "not-sold");

    var buyUnbuySection = productOption.querySelector(".buy-unbuy");
    buyUnbuySection.classList.remove("bought");
    

    var cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.id = "reset";
    cancelButton.textContent = "x";
    cancelButton.setAttribute("data-tooltip", "Видалити продукт");
    cancelButton.addEventListener("click", cancelButtonListener);

    buyUnbuySection.appendChild(cancelButton);

    var productName = null;
    try 
    {
      productName = this.parentNode.parentNode.querySelector(".product-name").textContent;
    } catch (nullPointerException) {
      productName = productOption.querySelector(".personal-option").value;
    }
    var amount = this.parentNode.parentNode.querySelector(".amount").textContent;

    var newProductItem = document.createElement("span");
    newProductItem.classList.add("product-item");
    newProductItem.id = productName;
    newProductItem.innerHTML = " <p class='"+productName+"'>"+productName+"</p>\n<span class='amount-in-cart id='" + productName + "'>" + amount + "</span>";

    remainingProductsBasket.appendChild(newProductItem);

    this.parentNode.parentNode.querySelector(".product-name").addEventListener('click', productNameListener)

    var boughtProductsBasket = document.getElementById("bought-products-basket");
    var productItemToRemove = boughtProductsBasket.querySelector("#" + productName);
    if (productItemToRemove) {
      boughtProductsBasket.removeChild(productItemToRemove);
    }
  }

  function productNameListener() {
     var currentName = this.textContent;
  
     var inputElement = document.createElement('input');
     inputElement.type = 'text';
     inputElement.className = 'personal-option'
     inputElement.id = 'personal-option';
     inputElement.placeholder = "Ваш товар";
     inputElement.value = currentName;
 
     this.parentNode.replaceChild(inputElement, this);
 
     inputElement.focus();

     inputElement.addEventListener('blur', function() {
        var editedName = inputElement.value;
  
        var newProductName = document.createElement('p');
        newProductName.className = 'product-name';
        newProductName.textContent = editedName;

        document.getElementById(currentName).querySelector("."+currentName).textContent = editedName;
        document.getElementById(currentName).querySelector("."+currentName).className = editedName;
        document.getElementById(currentName).id = editedName;
  
        inputElement.parentNode.setAttribute("name", editedName);
        inputElement.parentNode.replaceChild(newProductName, inputElement);
        newProductName.addEventListener('click', productNameListener)
      });
   }

   productNames.forEach(function(productName) {
     productName.addEventListener('click', productNameListener);
   });
   for (var i = 0; i < addButtons.length; i++) {
     addButtons[i].addEventListener("click", addButtonsListener);
   }
   for (var i = 0; i < removeButtons.length; i++) {
     removeButtons[i].addEventListener("click", removeButtonsListener);
   }
   for (var i = 0; i < boughtButtons.length; i++) {
     boughtButtons[i].addEventListener("click", boughtButtonListener );
   }
   for (var i = 0; i < notBoughtButtons.length; i++) {
     notBoughtButtons[i].addEventListener("click", notBoughtButtonListener);
   }
   for (var i = 0; i < cancelButtons.length; i++) {
     cancelButtons[i].addEventListener("click", cancelButtonListener);
   }
   
 });