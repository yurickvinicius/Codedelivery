<?php

namespace CodeDelivery\Transformers;

use CodeDelivery\Models\Cupom;
use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Order;

/**
 * Class OrderTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class OrderTransformer extends TransformerAbstract
{
    ///protected $defaultIncludes = ['cupom', 'items'];
    protected $availableIncludes = ['cupom', 'items', 'client'];

    /**
     * Transform the \Order entity
     * @param \Order $model
     *
     * @return array
     */
    public function transform(Order $model)
    {
        return [
            'id'         => (int) $model->id,
            'total' => (float) $model->total,
            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeClient(Order $model){
        return $this->item($model->client, new ClientTransformer());
    }

    // Many to One -> Cupom
    public function includeCupom(Order $model){
        if (!$model->cupom){
            return null;
        }
        return $this->item($model->cupom, new CupomTransformer());
    }

    // One to Mane -> OrdemItem
    public function includeItems(Order $model){
        return $this->collection($model->items, new OrderItemTransformer());
    }
}
