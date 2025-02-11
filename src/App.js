import { useState } from "react";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

// const initialTodos = [
//   { id: 1, name: "Learn React", status: false },
//   { id: 2, name: "Learn Npm", status: true },
//   { id: 3, name: "Learn Tailwind", status: false },
// ];

/*منبع اصلی داده (source of truth):
state todos باید منبع اصلی داده‌ها باشد که شامل تمام تو-دوها (چه active، چه completed) است. اگر شما مستقیماً روی همین state فیلتر اعمال کنید (مثلاً با استفاده از spread operator برای کپی کردن و سپس فیلتر کردن)، در نهایت داده‌های اصلی تغییر می‌کنند یا فقط بخش فیلتر شده باقی می‌ماند. مثلاً اگر شما todos را به‌روزرسانی کنید به‌طوری که فقط موارد active در آن باقی بماند، سپس وقتی می‌خواهید به حالت "All" یا "Completed" بروید، دیگر به داده‌های قبلی دسترسی نخواهید داشت.

افزودن/ویرایش داده بدون از دست دادن اطلاعات:
با داشتن یک state جداگانه برای نمایش فیلتر شده، شما همیشه state todos اصلی را حفظ می‌کنید. سپس هر بار که فیلتر تغییر می‌کند، state نمایش (filtered todos) را از روی todos اصلی محاسبه یا به‌روزرسانی می‌کنید. این کار تضمین می‌کند که هر تغییر (مثلاً اضافه کردن یا تغییر وضعیت یک تو-دو) بر روی todos اصلی اعمال شده و در صورت نیاز می‌توانید نمایش فیلتر شده را مجدداً از روی آن تولید کنید.

استفاده از spread operator فقط کپی سطحی ایجاد می‌کند:
spread operator ([...todos]) تنها یک کپی سطحی از آرایه ایجاد می‌کند، اما اگر شما از آن برای به‌روز کردن state اصلی استفاده کنید، این کپی ممکن است فقط به عنوان یک "نمای" (view) فیلتر شده باشد. اگر شما تغییرات فیلتر را مستقیماً روی todos اصلی اعمال کنید، اطلاعاتی که در آن هستند (یعنی مواردی که فیلتر شده‌اند) از بین می‌روند یا دسترسی به آن‌ها امکان‌پذیر نخواهد بود.

خلاصه:
todos منبع اصلی داده‌ها است و باید بدون فیلتر نگهداری شود.
filtered todos تنها نمای فعلی (view) داده‌ها را براساس فیلتر انتخاب‌شده نشان می‌دهد.
اگر مستقیماً روی todos تغییر ایجاد کنید (حتی با استفاده از spread operator)، ممکن است داده‌های اصلی را از دست بدهید یا state اصلی تغییر کند که در نتیجه فیلترهای بعدی درست کار نمی‌کنند.
به همین دلیل بهترین روش این است که داده‌های اصلی را در یک state نگه دارید و state دیگری داشته باشید که فقط نمای فیلتر شده آن را ذخیره می‌کند. این شیوه مدیریت به شما امکان می‌دهد در هر زمان فیلترها را تغییر دهید بدون آنکه منبع اصلی (todos) تغییر کند.
*/

export default function App() {
  const [theme, setTheme] = useState("darkTheme");
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState(todos);

  function toggleTheme() {
    setTheme((prevTheme) =>
      prevTheme === "darkTheme" ? "lightTheme" : "darkTheme"
    );
  }

  function handleAddtodo(newTodo) {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setFilterTodos((todos) => [...todos, newTodo]);
  }

  function handleStatusChange(id) {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      );
      setFilterTodos(updatedTodos); // همزمان با به‌روز شدن todos، filterTodos را هم به‌روز می‌کنیم
      return updatedTodos;
    });
  }

  function handleRemove(id) {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      setFilterTodos(updatedTodos); // به‌روز کردن filterTodos همزمان با todos
      return updatedTodos;
    });
  }

  function handleclear() {
    setTodos([]);
    setFilterTodos([]);
  }

  function handlefilter(status) {
    setFilterTodos(() => {
      if (status === "All") {
        return todos;
      }

      if (status === "Active") {
        return todos.filter((todo) => !todo.status);
        
      }

      if (status === "Completed") {
        return todos.filter((todo) => todo.status);
      }

      
    });
  }

  return (
    <div className="preload-transitions" data-theme={theme}>
      <div className="main__container">
        <div className="todo">
          <header className="header">
            <Logo toggleTheme={toggleTheme} theme={theme} />
            <AddTodo Addtodo={handleAddtodo} />
          </header>

          <main className="main">
            <TodoList
              todos={filterTodos}
              onStatusChange={handleStatusChange}
              onRemoveChange={handleRemove}
            />
            <div className="todo__filters">
              <TodoFilters
                todos={todos}
                handleclear={handleclear}
                handlefilter={handlefilter}
              />
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}

function Logo({ toggleTheme, theme }) {
  return (
    <>
      <div className="picture"></div>
      
    <section className="logo">
      <h2 className="logo__title">TODO</h2>
      <button className="btn btn--theme" onClick={toggleTheme}>
        {theme === "darkTheme" ? (
          <IoSunny style={{ fontSize: "3.5rem", color: "#fff" }} />
        ) : (
          <FaMoon style={{ fontSize: "3rem", color: "#fff" }} />
        )}
      </button>
    </section>
    </>
  );
}

function AddTodo({ Addtodo }) {
  const [todo, setTodo] = useState("");

  const id = Math.floor(Math.random() * 1000);

  function handleAddtodo(e) {
    if (e.key === "Enter") {
      if (!todo) return;
    
      const newTodo = {
        id: id,
        name: todo,
        status: false,
      };
      console.log(newTodo);
      setTodo("");
      Addtodo(newTodo);
    }
  }

  return (
    <div className="todo__header">
      <div className="todo__circle"></div>
      <input
        type="text"
        className="todo__input"
        placeholder="Create a new todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={handleAddtodo}
      />
    </div>
  );
}

function TodoList({ todos, onStatusChange, onRemoveChange }) {
  return (
    <ul className="todo__list">
      {todos.map((todo) => (
        <Todo
          todo={todo}
          key={todo.id}
          onStatusChange={onStatusChange}
          onRemoveChange={onRemoveChange}
        />
      ))}
    </ul>
  );
}

function Todo({ todo, onStatusChange, onRemoveChange }) {
  return (
    <li className="todo__elem todo">
      <div className="flex">
        <input
          type="checkbox"
          className="btn todo__check"
          checked={todo.status}
          onChange={() => onStatusChange(todo.id)}
        />
        <label style={todo.status ? { textDecoration: "line-through" } : {}}>
          {todo.name}
        </label>
      </div>
      <button
        className="btn todo__delete"
        onClick={() => onRemoveChange(todo.id)}
      >
        <i className="fa-solid fa-x"></i>
      </button>
    </li>
  );
}

function TodoFilters({ todos, handleclear, handlefilter }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const itemsLeft = todos.filter((todo) => !todo.status).length;

  function handleactive(filter) {
    setActiveFilter(filter);
    handlefilter(filter);
  }

  return (
    <div>
      <div className="todo__filters__sides">
        <p className="btn">
          <span id="items-left">{itemsLeft}</span> item(s) left
        </p>

        <div className="todo__filters__center">
          <p
            className={`filter ${activeFilter === "All" ? "active" : ""}`}
            onClick={() => handleactive("All")}
          >
            All
          </p>
          <p
            className={`filter ${activeFilter === "Active" ? "active" : ""}`}
            onClick={() => handleactive("Active")}
          >
            Active
          </p>
          <p
            className={`filter ${activeFilter === "Completed" ? "active" : ""}`}
            onClick={() => handleactive("Completed")}
          >
            Completed
          </p>
        </div>

        <button className="btn btn--clear" onClick={handleclear}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}
