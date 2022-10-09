<?php

namespace App\Http\Controllers;

use App\Models\category;
use App\Models\menu;
use Arr;
use DB;
use Illuminate\Http\Request;

class categoryController extends Controller
{
    public function getCategory()
    {
        $a = category::select('*')->orderBy('position', 'asc')->get();
        return $a;
    }

    public function position()
    {
        $a = category::select('*')->get();
        $isi = [];
        foreach ($a as $val) {
            $c = menu::where('idCategory', $val->idCategory)->sum('ratingsum');
            $a = menu::where('idCategory', $val->idCategory)->sum('ratingcount');
            if ($a != 0 || $c != 0) {
                $array = array(
                    'rate' => $c / $a,
                    'name' => $val->name,
                    'allrate' => $c,
                    'count' => $a,
                );
            } else {
                $array = array(
                    'rate' => 0,
                    'name' => $val->name,
                    'allrate' => $c,
                    'count' => $a,
                );
            }
            array_push($isi, $array);
        }
        // $array =

        // array_sort($isi, function($value){

        // });
        // $i = array($isi);
        // $sorted = collect($i)->orderBy('rate', 'ASC')->get();
        // dd($lead);
        //     $item = array($lead);

        //     $item['name'] = $lead->name;
        //     $item['rate'] = $lead->rate;

        //     rsort($item);

        //     return $item;
        // });
        // $sorted = ksort($isi);
        // array_values(Arr::sort($isi, function ($value) {
        // return $value['rate'];
        // }));

        $x = array($isi);
        usort($x, function($v1, $v2) {
          return strcmp($v1['allrate'], $v2['allrate']);
        });

        return $x;
    }
}
