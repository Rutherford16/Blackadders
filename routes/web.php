<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ToDoListController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/animasi', function () {
    return Inertia::render('Animasi');
})->middleware(['auth', 'verified'])->name('animasi');

Route::get('/textEditor', function () {
    return Inertia::render('TextEditor');
})->middleware(['auth', 'verified'])->name('textEditor');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/todolist', [ToDoListController::class, 'index'])->name('todolist.index');
    Route::post('/todolist/tambah', [ToDoListController::class, 'tambahTugas'])->name('todolist.tambah');
    Route::post('/todolist/selesai', [ToDoListController::class, 'selesai'])->name('todolist.selesai');
});

require __DIR__ . '/auth.php';
