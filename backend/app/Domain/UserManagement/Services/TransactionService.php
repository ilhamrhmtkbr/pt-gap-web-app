<?php

namespace Domain\UserManagement\Services;

use App\Infrastructure\Midtrans\Service\MidtransService;
use Domain\Inventory\Repositories\ProductRepositoryInterface;
use Domain\Sales\Repositories\SaleRepositoryInterface;
use Domain\UserManagement\Models\Transaction;
use Domain\UserManagement\Repositories\TransactionRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TransactionService
{
    public function __construct(
        private readonly SaleRepositoryInterface $saleRepository,
        private readonly ProductRepositoryInterface $productRepository,
        private readonly TransactionRepositoryInterface $repository,
    ) {}

    public function get(array $filters = []): LengthAwarePaginator
    {
        $perPage = (int) ($filters['per_page'] ?? 15);

        $filters['sort_by'] = $filters['sort_by'] ?? 'created_at';
        if (!in_array($filters['sort_by'], ['created_at'])) {
            throw new \Exception('Sort by field is not match.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $filters['sort_direction'] = $filters['sort_direction'] ?? 'desc';
        if (!in_array($filters['sort_direction'], ['asc', 'desc'])) {
            throw new \Exception('Sort direction is not match.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $filters['page'] = $filters['page'] ?? 1;

        return $this->repository->paginate($perPage, $filters);
    }

    public function show(string|int $id): Transaction
    {
        return $this->repository->findByIdOrFail($id);
    }

    public function create(array $data): Transaction
    {
        $midtransService = new MidtransService();
        $items = [];
        $total = 0;
        $orderId = Str::uuid();
        foreach ($data['items'] as $item) {
            $product = $this->productRepository->findById($item['product_id']);
            $getPrice = $product->price * $item['quantity'];
            $total += $getPrice;
            array_push($items, $midtransService->buildTransactionItem($product, $item['quantity']));
        }
        $params = $midtransService->buildTransactionParams($orderId, $total, $items);
        $response = $midtransService->createTransaction($params);
        $transaction = [
            'user_id' => auth()->user()->id,
            'order_id' => $orderId,
            'products' => $data['items'],
            'midtrans_data' => $response,
            'total_price' => $total,
        ];
        return $this->repository->create($transaction);
    }

    public function update(array $data): void
    {
        $midtransService = new MidtransService();
        $result = $midtransService->handleNotification($data);

        if (!$result['success']) {
            throw new \Exception($result['message'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $orderId = $result['data']['order_id'];
        if (str_starts_with($orderId, 'order')) {
            $orderId = substr($orderId, strlen('order'));
        }

        $transaction = $this->repository->findByOrderId($orderId);
        $transaction->update([
            'status' => $result['data']['transaction_status'],
        ]);
        if ($result['data']['transaction_status'] === 'settlement') {

            foreach ($transaction->products as $item) {
                $this->saleRepository->create([
                    'user_id'    => $transaction->user_id,
                    'product_id' => $item['product_id'],
                    'quantity'   => $item['quantity'],
                    'total_price' => $transaction->total_price,
                ]);
            }
        }
    }

    public function delete(Transaction $transaction): void
    {
        if ($transaction->status === 'settlement') {
            throw new \Exception('Transaksi yang sudah dibayar tidak bisa dihapus', Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $midtransService = new MidtransService();
            $midtransService->cancelTransaction($transaction->order_id);
            $this->repository->delete($transaction);
        }
    }
}
