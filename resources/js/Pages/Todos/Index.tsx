import {useState} from 'react';
import {PageProps} from '@/types';
import {Head} from '@inertiajs/react';
import {Inertia} from '@inertiajs/inertia';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
}

export default function Index({
  auth,
  todos: initialTodos,
}: PageProps<{todos: Todo[]}>) {
  const [todos, setTodos] = useState(initialTodos);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      Inertia.delete(`/todos/${id}`, {
        onSuccess: () => {
          setTodos(todos.filter((todo) => todo.id !== id));
        },
        onError: () => console.log('error'),
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title');

    Inertia.post(
      '/todos',
      {title},
      {
        onSuccess: () => {
          setTodos([
            ...todos,
            {id: Date.now(), title: title as string, completed: false},
          ]); // ダミーのIDを使用
          event.currentTarget.reset();
        },
      },
    );
  };

  return (
    <div>
      <Head title="todos" />
      <header className="text-white font-bold text-3xl rounded-b p-2 bg-orange-600">
        <div>Laravel Demo</div>
      </header>
      <div className="mx-auto justify-center max-w-3xl p-4">
        <h1 className="font-bold text-5xl p-2 text-center text-orange-600">
          Todo List
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center my-4"
        >
          <input
            className="rounded-l-lg h-12"
            name="title"
            type="text"
            placeholder="New Todo"
          />
          <button
            className="rounded-r-lg bg-orange-600 text-white p-3 h-12"
            type="submit"
          >
            Add
          </button>
        </form>
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="border p-2 rounded flex items-center justify-between hover:bg-green-50"
            >
              <div className="text-xl">
                {todo.id}. {todo.title}
              </div>
              <button
                className="text-gray-500 hover:bg-orange-100 rounded p-2 hover:font-bold"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
