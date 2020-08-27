<?php

namespace App\Http\Controllers;

use App\Types;
use App\Brands;
use App\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{

    public function index()
    {
        return response()->json(["products" => Products::all()]);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:products|max:255',
            'type' => 'required',
            'brand' => 'required',
            'price' => 'required|regex:/^\d+(\.\d{1,2})?$/|min:0',
            'qty' => 'required|integer|min:0',
            'img' => 'required|image',
            'imgDetail' => 'required|image',

        ]);

        if($validator->fails())
        {
            return response()->json(["error" => $validator->errors()], 400);
        }

        try
        {
            $product = new Products();
            $product->name = $request->name;
            $product->type = $request->type;
            $product->brand = $request->brand;
            $product->price = $request->price;
            $product->qty = $request->qty;
            $product->user = 'admin123';
            $product->save();
            $id = $product->id;

        }catch (QueryException $e)
        {
            return response()->json(["error" => $e->getMessage()],500);
        }

        $db_name_1 = '/img/placeholder.png';
        $db_name_2 = '/img/placeholder.png';

        if($request->hasFile('img'))
        {
            $image = $request->img;
            $new_name_1 = $id.'_product'.'.'.$image->getClientOriginalExtension();
            $image->move(public_path('img'), $new_name_1);
            $db_name_1 = '/img/'.$new_name_1;
        }
        if($request->hasFile('imgDetail'))
        {
            $imgDetail = $request->imgDetail;
            $new_name_2 = $id.'_detail'.'.'.$imgDetail->getClientOriginalExtension();
            $imgDetail->move(public_path('img'), $new_name_2);
            $db_name_2 = '/img/'.$new_name_2;
        }

        DB::table('products')
            ->where('id', $id)
            ->update(['img' => $db_name_1, 'imgDetail' => $db_name_2]);

        return response()->json(['Status' => "Success"]);
    }

    public function update(Request $request)
    {
        $id = $request->id;

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'type' => 'required',
            'brand' => 'required',
            'price' => 'required|regex:/^\d+(\.\d{1,2})?$/',
            'qty' => 'required|integer|min:0',

        ]);

        if($validator->fails())
        {
            return response()->json(["error" => $validator->errors()], 400);
        }

        try
        {
            $product = Products::find($id);
            $product->name = $request->name;
            $product->type = $request->type;
            $product->brand = $request->brand;
            $product->price = $request->price;
            $product->qty = $request->qty;
            // $product->user = Auth::user()->username;
            $product->user = 'admin123';
            $product->save();

        } catch (QueryException $e) {

            return response()->json(["error" => $e->getMessage()], 500);
        }

        if($request->hasFile('img'))
        {
            $image = $request->img;
            $new_name_1 = $id.'_product'.'.'.$image->getClientOriginalExtension();
            $image->move(public_path('img'), $new_name_1);
            $db_name_1 = '/img/'.$new_name_1;

            DB::table('products')
                ->where('id', $id)
                ->update(['img' => $db_name_1]);
        }

        if($request->hasFile('imgDetail'))
        {
            $imgDetail = $request->imgDetail;
            $new_name_2 = $id.'_detail'.'.'.$imgDetail->getClientOriginalExtension();
            $imgDetail->move(public_path('img'), $new_name_2);
            $db_name_2 = '/img/'.$new_name_2;

            DB::table('products')
                ->where('id', $id)
                ->update(['imgDetail' => $db_name_2]);
        }

        return response()->json(['Status' => "Success"]);
    }

    public function delete($id)
    {
        try {
            $product = Products::find($id);
            $product->delete();
        } catch (QueryException $e) {
            return response()->json(["error" => $e->getMessage()], 500);
        }

        return response()->json(['Status' => "Success"]);
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
