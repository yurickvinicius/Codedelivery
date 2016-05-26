<?php

namespace CodeDelivery\Http\Controllers;

use CodeDelivery\Repositories\CategoryRepository;
use CodeDelivery\Repositories\ProductRepository;
use CodeDelivery\Http\Requests;
use CodeDelivery\Http\Requests\AdminProductRequest;

class ProductsController extends Controller
{

    private $repository;
    private $categoryRepository;

    public function __construct(ProductRepository $repository, CategoryRepository $categoryRepository){
        $this->repository = $repository;
        $this->categoryRepository = $categoryRepository;
    }

    public function index(){

        $products = $this->repository->paginate();
        return view('admin.products.index', compact('products'));

    }

    public function create(){
        $categories = $this->categoryRepository->listsInArray();
        return view('admin.products.create', compact('categories'));
    }

    public function store(AdminProductRequest $request){
        $data = $request->all();
        $this->repository->create($data);

        return redirect()->route('admin.products.index');
    }

    public function edit($id){
        $product = $this->repository->find($id);
        $categories = $this->categoryRepository->listsInArray();  //// metodo criado em CategoryReposistoryEloquent para retornar um array

        return view('admin.products.edit', compact('product', 'categories'));
    }

    public function update(AdminProductRequest $request, $id){
        $data = $request->all();
        $this->repository->update($data, $id);

        return redirect()->route('admin.products.index');
    }

    public function destroy($id){
        $this->repository->delete($id);
        return redirect()->route('admin.products.index');
    }
}
