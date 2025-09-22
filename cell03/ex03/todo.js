function getTodos() {
  const cookie = document.cookie
    .split("; ")
    .find(row => row.startsWith("todos="));
  return cookie ? JSON.parse(decodeURIComponent(cookie.split("=")[1])) : [];
}

function saveTodos(todos) {
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";path=/";
}

function renderTodos() {
  const list = document.getElementById("ft_list");
  list.innerHTML = "";
  const todos = getTodos();
  todos.forEach((todo, index) => {
    const div = document.createElement("div");
    div.innerText = todo;
    div.onclick = () => {
      if (confirm("Do you want to remove this TO DO?")) {
        todos.splice(index, 1);
        saveTodos(todos);
        renderTodos();
      }
    };
    list.insertBefore(div, list.firstChild);
  });
}

function newTodo() {
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    const todos = getTodos();
    todos.unshift(text.trim());
    saveTodos(todos);
    renderTodos();
  }
}

window.onload = renderTodos;

