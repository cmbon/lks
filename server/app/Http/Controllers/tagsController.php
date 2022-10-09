<?php

namespace App\Http\Controllers;

use App\Models\tags;
use DB;
use Illuminate\Http\Request;

class tagsController extends Controller
{
    public function getByTags($slug)
    {
        return tags::where('name', 'like', $slug . '%')->get();
    }

    public function getMenu($slug)
    {
        $b =  DB::table('menus_tags')
            ->join('menus', 'menus.idMenu', '=', 'menus_tags.idMenu')
            ->join('tags', 'tags.idTag', '=', 'menus_tags.idTag')
            ->where('tags.name', $slug)
            ->get();
        // dd($b);
        if ($b->isNotEmpty()) {
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
        } else {
            $array = "";
        }
        return array($array);
    }
}
