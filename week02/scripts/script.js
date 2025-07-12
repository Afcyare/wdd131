const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");





button.addEventListener("click", function () {
    if (input.value.trim() !== '') {
        const list_item = document.createElement("li");
        const delBtn = document.createElement("button");
        
        list_item.textContent = input.value;
        delBtn.textContent = "❌";
        delBtn.setAttribute("aria-label", `Remove ${input.value}`)
        
        list_item.append(delBtn);
        list.append(list_item);

        input.value = '';
        input.focus();
    } else {
        input.focus()
        alert("Please enter a chapter!"); 
    }
});

// 2. Event Delegation for DELETING items (❌ buttons)
list.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON" && e.target.textContent === "❌") {
    e.target.closest("li").remove(); // Safely remove the parent <li>
    input.focus();                   // Focus back to input
  }
});

