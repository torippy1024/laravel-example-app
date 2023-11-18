<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::all();
        return Inertia::render('Todos/Index', ['todos' => $todos]);
    }

    public function store(Request $request)
    {
        Todo::create($request->all());
        return redirect()->back();
    }

    public function update(Request $request, Todo $todo)
    {
        $todo->update($request->all());
        return redirect()->back();
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return redirect()->back();
    }
}
