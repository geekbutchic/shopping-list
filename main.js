const shoppingList = {
  items: [], // ARRAY TO SAVE RAW DATA
  htmlShoppingList: null,
  htmlAddItemForm: null,
  htmlInputField: null,
  initiate: () => {
    // OBTAINS HTML ELEMENTS -> SET'S UP PAGE
    shoppingList.htmlShoppingList = document.getElementById("shop-list");
    shoppingList.htmlAddItemForm = document.getElementById("shop-add");
    shoppingList.htmlInputField = document.getElementById("shop-item");
    shoppingList.htmlAddItemForm.addEventListener("submit", shoppingList.add);

    // RESTORES PREVIOUS SHOPPING LIST
    if (localStorage.items === undefined) {
      localStorage.items = "[]";
    }
    shoppingList.items = JSON.parse(localStorage.items);

    // EXECUTES INSIDE BLOCK .DRAW() FUNCTION
    shoppingList.draw();
  },

  // ADDS NEW ITEM TO LIST
  add: function (event) {
    // PREVENT FORM RE-SUBMISSION
    event.preventDefault();

    // ADDS ITEM TO LIST
    shoppingList.items.push({
      name: shoppingList.htmlInputField.value, // NAME
      done: false, // TRUE = "IN CART" | FALSE = FOR "NOT YET"
    });

    // UPDATES LOCAL STORAGE
    shoppingList.htmlInputField.value = "";
    shoppingList.save();

    // EXECUTE CODE
    shoppingList.draw();
  },

  // DRAW THE HTML SHOPPING LIST
  draw: function () {
    shoppingList.htmlShoppingList.innerHTML = "";
    if (shoppingList.items.length > 0) {
      let row, name, deleteButton, okayButton;
      for (let i in shoppingList.items) {
        // CREATES ITEM ROW
        row = document.createElement("div");
        row.className = "item-row";
        shoppingList.htmlShoppingList.appendChild(row);

        // CREATES ITEM NAME
        name = document.createElement("div");
        name.className = "item-name";
        name.innerHTML = shoppingList.items[i].name;
        if (shoppingList.items[i].done) {
          name.classList.add("item-got");
        }
        row.appendChild(name);

        // DELETE BUTTON
        deleteButton = document.createElement("input");
        deleteButton.className = "item-del";
        deleteButton.type = "button";
        deleteButton.value = "Delete";
        deleteButton.dataset.id = i;
        deleteButton.addEventListener("click", shoppingList.delete);
        row.appendChild(deleteButton);

        // COMPLETED ? NOT YET : IN CART -> BUTTON
        okayButton = document.createElement("input");
        okayButton.className = "item-ok";
        okayButton.type = "button";
        okayButton.value = shoppingList.items[i].done ? "IN CART" : "NOT YET";
        okayButton.dataset.id = i;
        okayButton.addEventListener("click", shoppingList.toggle);
        row.appendChild(okayButton);
      }
    }
  },

  // UPDATES SHOPPING LIST TO LOCAL STORAGE
  save: function () {
    if (localStorage.items === undefined) {
      localStorage.items = "[]";
    }
    localStorage.items = JSON.stringify(shoppingList.items);
  },

  // DELETES ITEM FROM LIST
  delete: function () {
    if (confirm("Remove selected item?")) {
      shoppingList.items.splice(this.dataset.id, 1);
      shoppingList.save();
      shoppingList.draw();
    }
  },

  // TOGGLE FUNCTION FOR IN CART ? NOT YET
  toggle: function () {
    let id = this.dataset.id;
    shoppingList.items[id].done = !shoppingList.items[id].done;
    shoppingList.save();
    shoppingList.draw();
  },
};

window.addEventListener("DOMContentLoaded", shoppingList.initiate);





