<?php

namespace App\Http\Controllers;

use App\OrderList;
use App\Orders;
use App\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Orders::all();

        foreach ($orders as $order)
        {
            $orderList = Orders::find($order->id)->orderlist;
            $order->orderList = $orderList;
        }

        return response()->json(["orders" => $orders]);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email',
            'contact' => 'required|regex:/(01)[0-9]{8,9}/',
            'address' => 'required',

        ]);

        if($validator->fails())
        {
            return response()->json(["error" => $validator->errors()], 400);
        }

        $document = $request->cart;
        $all_exceed = [] ;
        foreach($document as $check){

            $purchase_id = $check['id'];
            $purchase_qty = $check['qty'];

            $stock_qty = DB::table('products')
                        ->select('qty')
                        ->where('id', $purchase_id)
                        ->get();

            foreach($stock_qty as $stock_qty1){
                $qty = $stock_qty1->qty;
            }

            if ($qty == 0 || $qty < $purchase_qty){

                $exceed = [
                    'id' => $purchase_id,
                    'qty' => $qty,
                ];

                array_push($all_exceed, $exceed);
            }
        }

        $token = md5(rand(1, 10).microtime());
        if ($all_exceed != null)
        {
            return response()->json(["error" => $all_exceed], 409);
        }
        else
        {

            //insert into orders database
            try
            {
                $order = new Orders();
                $order->name = $request->name;
                $order->email = $request->email;
                $order->contact = $request->contact;
                $order->address = $request->address;
                $order->total_price = $request->total_price;
                $order->email_token = $token;
                $order->status = "OrderConfirmed";
                $order->save();
                $id = $order->id;
            }
            catch (QueryException $e)
            {
                return response()->json(["error" => $e->getMessage()],500);
            }


            //insert into order_list database
            try
            {
                foreach($document as $data){
                    $orderlist = new OrderList();
                    $orderlist->orders_id = $id;
                    $orderlist->product_id = $data['id'];
                    $orderlist->name = $data['name'];
                    $orderlist->type = $data['type'];
                    $orderlist->brand = $data['brand'];
                    $orderlist->price = $data['price'];
                    $orderlist->qty = $data['qty'];
                    $orderlist->save();
                    $product_id = $data['id'];
                    $order_qty = $data['qty'];
                    $products = Products::find($product_id);
                    $product_qty = $products->qty;
                    $new_qty = $product_qty - $order_qty;
                    $products->qty = $new_qty;
                    $products->save();
                }

            } catch (QueryException $e) {

                return response()->json(["error" => $e->getMessage()], 500);
            }

        }

        return response()->json(['Status' => "Success"]);
    }

    public function updateStatus(Request $request)
    {
        $list = $request->orderlist;
        $status = $request->status;
        try
        {
            $order = Orders::find($request->id);
            if($status == "Cancelled")
            {
                foreach($list as $item)
                {
                    $product = Products::find($item['product_id']);
                    $product->qty = $product->qty + $item['qty'];
                    $product->save();
                }
            }
            $order->status = $status;
            $order->save();
        }
        catch(QueryException $e)
        {
            return response()->json(["error" => $e->getMessage()], 500);
        }

        return response()->json(['Status' => "success"]);
    }
}
