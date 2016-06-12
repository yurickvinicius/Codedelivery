<?php
/**
 * Created by PhpStorm.
 * User: yurickvinicius
 * Date: 10/06/16
 * Time: 13:32
 */

namespace CodeDelivery\Http\Controllers;


use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\UserRepository;
use Illuminate\Http\Request;

class OrdersController extends Controller
{

    private $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index()
    {
        $orders = $this->orderRepository->paginate();
        return view('admin.orders.index', compact('orders'));
    }

    public function edit($id, UserRepository $userRepository)
    {
        $list_status = [
            '0' => 'Pendente',
            '1' => 'A caminho',
            '2' => 'Entregue',
        ];

        $order = $this->orderRepository->find($id);
        $deliveryman = $userRepository->getDeliverymen();

        return view('admin.orders.edit', compact('order', 'list_status', 'deliveryman'));
    }

    public function update(Request $request, $id)
    {

        $all = $request->all();
        $this->orderRepository->update($all, $id);

        return redirect()->route('admin.orders.index');
        
    }

}