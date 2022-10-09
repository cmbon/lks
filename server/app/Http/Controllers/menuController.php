<?php

namespace App\Http\Controllers;

use App\Models\menu;
use Arr;
use DB;
use Illuminate\Http\Request;

class menuController extends Controller
{

    public function AllMenu(Request $request)
    {
        $a = DB::table('menus')->get();
        $isi = [];
        foreach ($a as $val) {

            if ($val->ratingcount != 0) {
                $rate = $val->ratingsum / $val->ratingcount;
                $array = array(
                    'id' => $val->idMenu,
                    'name' => $val->name,
                    'idCategory' => $val->idCategory,
                    'description' => $val->description,
                    'price' => $val->price,
                    'rating' =>  $rate
                );
            } else {
                $array = array(
                    'id' => $val->idMenu,
                    'name' => $val->name,
                    'idCategory' => $val->idCategory,
                    'description' => $val->description,
                    'price' => $val->price,
                    'rating' =>  0
                );
            }
            array_push($isi, $array);
        }
        $v = Arr::shuffle($isi);
        return $v;
    }

    public function getCategoti($slug) {
        $c = menu::where('idCategory', $slug)->get();
        return $c;
    }


    public function GetId($slug, $id)
    {
        $b = DB::table('menus')->select('*')->where('description', $id)->where('idMenu', $slug)->get();

        if ($b[0]->ratingcount != 0) {
            $rate = $b[0]->ratingsum / $b[0]->ratingcount;
            $array = array(
                'id' => $b[0]->idMenu,
                'name' => $b[0]->name,
                'idCategory' => $b[0]->idCategory,
                'description' => $b[0]->description,
                'price' => $b[0]->price,
                'rating' =>  $rate
            );
        } else {
            $array = array(
                'id' => $b[0]->idMenu,
                'name' => $b[0]->name,
                'idCategory' => $b[0]->idCategory,
                'description' => $b[0]->description,
                'price' => $b[0]->price,
                'rating' =>  0
            );
        }
        return $array;
    }
}
