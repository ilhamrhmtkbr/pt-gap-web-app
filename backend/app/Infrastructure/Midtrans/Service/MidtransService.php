<?php

namespace App\Infrastructure\Midtrans\Service;

use Domain\Inventory\Models\Product;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MidtransService
{
    private string $serverKey;
    private string $baseUrl;
    private string $coreUrl;

    public function __construct()
    {
        $this->serverKey = config('midtrans.server_key');
        $this->baseUrl = config('midtrans.base_url');
        $this->coreUrl = config('midtrans.core_url');
    }

    public function createTransaction($params)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . base64_encode($this->serverKey . ':')
        ])->post($this->baseUrl . 'snap/v1/transactions', $params);

        if ($response->successful()) {
            return $response->json();
        } else {
            throw new \Exception($response->json(), 500);
        }
    }

    /**
     * Get Transaction Status
     */
    public function getTransactionStatus($orderId): array
    {
        try {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Authorization' => 'Basic ' . base64_encode($this->serverKey . ':')
            ])->get($this->coreUrl . 'v2/' . $orderId . '/status');

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $response->json()
                ];
            }

            return [
                'success' => false,
                'message' => 'Failed to get transaction status',
                'error' => $response->json()
            ];

        } catch (\Exception $e) {
            Log::error('Midtrans Get Status Error: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error getting transaction status: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Cancel Transaction
     */
    public function cancelTransaction($orderId): array
    {
        try {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Authorization' => 'Basic ' . base64_encode($this->serverKey)
            ])->post($this->coreUrl . 'v2/' . $orderId . '/cancel');

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $response->json()
                ];
            }

            return [
                'success' => false,
                'error' => $response->json(),
            ];


        } catch (\Exception $e) {
            Log::error('Midtrans Cancel Transaction Error: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error canceling transaction: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Handle Webhook/Notification
     */
    public function handleNotification($payload): array
    {
        try {
            // Verify signature
            $signature = $payload['signature_key'] ?? '';
            $orderId = $payload['order_id'] ?? '';
            $statusCode = $payload['status_code'] ?? '';
            $grossAmount = $payload['gross_amount'] ?? '';

            $expectedSignature = hash('sha512', $orderId . $statusCode . $grossAmount . $this->serverKey);

            if ($signature !== $expectedSignature) {
                return [
                    'success' => false,
                    'message' => 'Invalid signature'
                ];
            }

            // Process based on transaction status
            $transactionStatus = $payload['transaction_status'] ?? '';
            $fraudStatus = $payload['fraud_status'] ?? '';

            return [
                'success' => true,
                'data' => [
                    'order_id' => $orderId,
                    'transaction_status' => $transactionStatus,
                    'fraud_status' => $fraudStatus,
                    'status_code' => $statusCode,
                    'payment_type' => $payload['payment_type'] ?? '',
                    'gross_amount' => $grossAmount
                ]
            ];

        } catch (\Exception $e) {
            Log::error('Midtrans Handle Notification Error: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error handling notification: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Build transaction parameters
     */
    public function buildTransactionParams(string $orderId, string $grossAmount, array $items): array
    {
        $user = auth()->user();
        $names = explode(' ', $user->name);
        $firstName = reset($names);
        $lastName = end($names);

        return [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $grossAmount
            ],
            'customer_details' => [
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $user->email,
                'billing_address' => [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $user->email,
                    'address' => 'Indonesia',
                ],
                'shipping_address' => [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $user->email,
                    'address' => 'Indonesia',
                ]
            ],
            'item_details' => $items,
            'custom_field1' => 'ilhamrhmtkbr-coding',
            'callbacks' => [
                'finish' => config('app.frontend_public') . '/transactions#top'
            ],
        ];
    }

    public function buildTransactionItem(Product $product, int $quantity): array
    {
        return [
            'id' => $product->getKey(),
            'price' => $product->price,
            'quantity' => $quantity,
            'name' => $product->name,
            'brand' => 'ilhamrhmtkbr',
            'category' => $product->tag,
            'merchant_name' => 'Midtrans',
            'url' => config('app.frontend_public')
        ];
    }
}
