<?php

namespace App\Http\Controllers;

use App\Types;
use App\Brands;
use App\Products;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{

    public function index()
    {
        return response()->json(["products" => Products::all()]);
    }

    public function show($id)
    {
        try {
            $product = Products::findOrFail($id);
            return response()->json(["product" => $product]);
        } catch (ModelNotFoundException $ex) {
            return response()->json(["message"=> $ex->getMessage()], 404);
        }
    }

    public function search(Request $request)
    {
        //default value to empty string if no value is passed in
        $name = empty($request->name)? "": $request->name;
        $type = empty($request->type)? "": $request->type;
        $brand = empty($request->brand)? "": $request->brand;

        $product = $this->searchProduct($name, $type, $brand);

        return response()->json($product);
    }

    public function searchParams()
    {
        $types = Types::all();
        $brands = Brands::all();

        return response()->json(["types" => $types, "brands" => $brands]);
    }

    public function searchProduct(string $name, string $type, string $brand)
    {
        $product = Products::where('name', 'LIKE', '%'.$name.'%')
                            ->where('type', 'LIKE', '%'.$type.'%')
                            ->where('brand', 'LIKE', '%'.$brand.'%')
                            ->get();

        return $product;
    }
}
