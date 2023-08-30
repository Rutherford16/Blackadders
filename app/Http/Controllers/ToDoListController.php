<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\ToDoList;
use Illuminate\Http\Request;
use App\Http\Requests\StoreImage;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class ToDoListController extends Controller
{
    public function index()
    {
        $sort = DB::table('to_do_lists')
        ->orderBy("is_complete")
        ->orderBy("deadline")
        ->orderBy("updated_at", "asc")
        ->paginate(5);
        Log::info($sort);

        return Inertia::render(
            'Todolist',
            ['todolist' => $sort]
        );
    }

    public function tambahTugas(Request $request){
        $newListItem = new ToDoList();
        $newListItem->name = $request->name;
        $newListItem->deadline = $request->deadline;
        $newListItem->is_complete = 0;
        $newListItem->save();

        return Redirect::route('todolist.index');
    }

    public function selesai(StoreImage $request){
        Log::info($request->id);
        $item = ToDoList::find($request->id);
        if($request->hasFile('bukti')){
            $filename= date('YmdHi').'_'.$request->id.'.'.$request->file('bukti')->getClientOriginalExtension();
            $request->file('bukti')->storeAs('public/image', $filename);
            // $file->move(public_path('public/image/bukti'), $filename);
            $item->bukti = $filename;
        }
        $item->is_complete = 1;
        $item->save();

        return Redirect::route('todolist.index');
    }
}
