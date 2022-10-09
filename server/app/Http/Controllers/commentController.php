<?php

namespace App\Http\Controllers;

use App\Models\comment;
use App\Models\menu;
use DB;
use Illuminate\Http\Request;

class commentController extends Controller
{
    public function Comment(Request $request)
    {
        $a = DB::table('comments')->select('*')->where('idUser', $request->user)->where('idMenu', $request->menu)->get();
        if ($a->isNotEmpty()) {
            if ($a[0]->rating > $request->rating) {
                $rate = $a[0]->rating - $request->rating;
                $c = menu::where('idMenu', $request->menu)->get();

                menu::where('idMenu', $request->menu)
                    ->update([
                        'ratingsum' => $c[0]->ratingsum - $rate
                    ]);
            }
            if ($a[0]->rating < $request->rating) {
                $rate = $request->rating - $a[0]->rating;
                $c = menu::where('idMenu', $request->menu)->get();

                menu::where('idMenu', $request->menu)
                    ->update([
                        'ratingsum' => $c[0]->ratingsum + $rate
                    ]);
            }

            DB::table('comments')->where('idUser', $request->user)->where('idMenu', $request->menu)
                ->update([
                    'comment' => $request->comment,
                    'rating' => $request->rating,
                    "updated_at" => \Carbon\Carbon::now()
                ]);
            return response()->json([
                'status' => 'success',
            ]);
        } else {
            comment::insert([
                'idUser' => $request->user,
                'idMenu' => $request->menu,
                'comment' => $request->comment,
                'rating' => $request->rating,
                "created_at" =>  \Carbon\Carbon::now(), # new \Datetime()
                "updated_at" => \Carbon\Carbon::now(),  # new \Datetime()
            ]);
            $c = menu::where('idMenu', $request->menu)->get();
            menu::where('idMenu', $request->menu)
                ->update([
                    'ratingcount' => $c[0]->ratingcount + 1,
                    'ratingsum' => $c[0]->ratingsum + $request->rating
                ]);
            return response()->json([
                'status' => 'success',
            ]);
        }
    }

    public function getId(Request $request)
    {
        $a = comment::where('idUser', $request->user)->where('idMenu', $request->menu)->get();
        return $a;
    }
    public function getidComment($id) {
        $a = comment::
        join('users', 'users.idUser', '=', 'comments.idUser')
        ->where('idMenu', $id)->orderBy('created_at', 'DESC')->get();
        return $a;
    }
}
