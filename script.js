// Wait for the DOM to be fully loaded before running the script
// This ensures all elements are available before we access them
document.addEventListener("DOMContentLoaded", () => {
    // Get references to DOM elements we'll need
    const todoInput = document.getElementById("todoInput"); // Input field for new todos
    const addTodoBtn = document.getElementById("addTodo"); // Button to add a new todo
    const todoList = document.getElementById("todoList"); // List container for todo items
  
    // Initialize todos array from localStorage, or empty array if nothing stored
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
  
    // Function to save todos to localStorage
    function saveTodos() {
      localStorage.setItem("todos", JSON.stringify(todos)); // Convert array to string and store
    }
  
    // Function to render/display all todos in the DOM
    function renderTodos() {
      todoList.innerHTML = ""; // Clear the current list before re-rendering
  
      // Loop through each todo item
      todos.forEach((todo, index) => {
        const li = document.createElement("li"); // Create a new list item element
  
        // Add Tailwind CSS classes for styling
        li.className =
          "flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm";
  
        // Set the inner HTML of the list item, including the checkbox and buttons
        li.innerHTML = `
                  <div class="flex items-center space-x-2">
                      <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" ${
                        todo.completed ? "checked" : "" // Mark as checked if completed
                      }>
                      <span class="todo-text ${
                        todo.completed
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }">${todo.text}</span>
                  </div>
                  <div class="space-x-2">
                      <button class="edit-btn text-blue-500 hover:text-blue-700">Edit</button>
                      <button class="delete-btn text-red-500 hover:text-red-700">Delete</button>
                  </div>
              `;
  
        // Get reference to the checkbox in this todo item
        const checkbox = li.querySelector('input[type="checkbox"]');
  
        // Add event listener for checkbox changes (marking task as completed or not) 
        checkbox.addEventListener("change", () => {
          todo.completed = checkbox.checked; // Update the completed status
          saveTodos(); // Save changes to localStorage
          renderTodos(); // Re-render the list
        });
  
        // Get reference to the edit button
        const editBtn = li.querySelector(".edit-btn");
  
        // Add event listener for edit button clicks
        editBtn.addEventListener("click", () => {
          const newText = prompt("Edit task:", todo.text); // Show prompt with current text
          if (newText !== null) {
            // If user didn't cancel the prompt
            todo.text = newText.trim(); // Update todo text
            saveTodos(); // Save changes
            renderTodos(); // Re-render the list
          }
        });
  
        // Get reference to the delete button
        const deleteBtn = li.querySelector(".delete-btn");
  
        // Add event listener for delete button clicks
        deleteBtn.addEventListener("click", () => {
          todos.splice(index, 1); // Remove the todo at current index
          saveTodos(); // Save changes to localStorage
          renderTodos(); // Re-render the list
        });
  
        // Append the completed list item to the todo list
        todoList.appendChild(li);
      });
    }
  
    // Add event listener for the "Add Todo" button
    addTodoBtn.addEventListener("click", () => {
      const text = todoInput.value.trim(); // Get input value and remove whitespace
      if (text) {
        // Only add if there's text entered
        todos.push({ text, completed: false }); // Add new todo to the array
        todoInput.value = ""; // Clear the input field
        saveTodos(); // Save to localStorage
        renderTodos(); // Re-render the list
      }
    });
  
    // Add event listener for Enter key in the input field
    todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        // If Enter key is pressed
        addTodoBtn.click(); // Trigger the Add Todo button click
      }
    });
  
    // Initial render of todos when page loads
    renderTodos();
  });
  