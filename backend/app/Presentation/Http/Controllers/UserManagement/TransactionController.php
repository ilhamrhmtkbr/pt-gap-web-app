<?php

namespace Presentation\Http\Controllers\UserManagement;

use Application\UserManagement\Transaction\CreateTransactionUseCase;
use Application\UserManagement\Transaction\DeleteTransactionUseCase;
use Application\UserManagement\Transaction\ExportTransactionDTO;
use Application\UserManagement\Transaction\ExportTransactionUseCase;
use Application\UserManagement\Transaction\GetTransactionUseCase;
use Application\UserManagement\Transaction\TransactionDTO;
use Barryvdh\DomPDF\Facade\Pdf;
use Domain\UserManagement\Models\Transaction;
use Domain\UserManagement\Services\TransactionService;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Lang;
use Infrastructure\Export\UserManagement\TransactionExportSheet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Maatwebsite\Excel\Facades\Excel;
use Presentation\Http\Controllers\Controller;
use Presentation\Helper\ResponseApiHelper;
use Presentation\Http\Requests\UserManagement\Transaction\CreateTransactionRequest;
use Presentation\Http\Requests\UserManagement\Transaction\ExportTransactionRequest;
use Presentation\Http\Resources\UserManagement\TransactionResource;

class TransactionController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('jwt', except: ['midtrans']),
            new Middleware(\Illuminate\Routing\Middleware\SubstituteBindings::class, except: ['midtrans']),
        ];
    }

    public function __construct(
        private readonly TransactionService       $transactionService,
        private readonly GetTransactionUseCase    $getTransactionUseCase,
        private readonly CreateTransactionUseCase $createTransactionUseCase,
        private readonly DeleteTransactionUseCase $deleteTransactionUseCase,
        private readonly ExportTransactionUseCase $exportTransactionUseCase,
    )
    {
    }

    public function index(Request $request): JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Transaction::class);

        try {
            $filters = $request->only(['search', 'sort_by', 'sort_direction', 'per_page', 'page']);
            return TransactionResource::collection(($this->getTransactionUseCase)($filters));
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode(),
            );
        }
    }

    public function show(Transaction $transaction): JsonResponse
    {
        Gate::authorize('view', $transaction);

        return ResponseApiHelper::send(
            Lang::get('request-data.get-success'),
            Response::HTTP_OK,
            new TransactionResource($transaction),
        );
    }

    public function store(CreateTransactionRequest $request): JsonResponse
    {
        Gate::authorize('create', Transaction::class);

        try {
            $result = ($this->createTransactionUseCase)(
                TransactionDTO::fromRequest($request->validated())
            );

            return ResponseApiHelper::send(
                Lang::get('request-data.store-success'),
                Response::HTTP_CREATED,
                new TransactionResource($result),
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function midtrans(Request $request): JsonResponse
    {
        try {
            $this->transactionService->update($request->toArray());

            return ResponseApiHelper::send(
                Lang::get('request-data.update-success'),
                Response::HTTP_OK,
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function destroy(Transaction $transaction): JsonResponse
    {
        Gate::authorize('delete', $transaction);

        try {
            ($this->deleteTransactionUseCase)($transaction);

            return ResponseApiHelper::send(
                Lang::get('request-data.destroy-success'),
                Response::HTTP_OK,
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode()
            );
        }
    }

    public function exportPdf(ExportTransactionRequest $request): \Illuminate\Http\Response
    {
        Gate::authorize('export', Transaction::class);

        $dto = ExportTransactionDTO::fromRequest($request->validated());
        $result = ($this->exportTransactionUseCase)($dto);

        $filename = sprintf('laporan-transaction-%s-%s.pdf', $dto->startDate, $dto->endDate);

        $pdf = Pdf::loadView('pdf.usermanagement.transaction', compact('result'))
            ->setPaper('a4', 'portrait')
            ->setOptions([
                'defaultFont' => 'DejaVu Sans',
                'isHtml5ParserEnabled' => true,
                'isRemoteEnabled' => false,
                'dpi' => 150,
                'chroot' => public_path(),
            ]);

        return $pdf->download($filename);
    }

    public function exportExcel(ExportTransactionRequest $request): \Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        Gate::authorize('export', Transaction::class);

        $dto = ExportTransactionDTO::fromRequest($request->validated());
        $result = ($this->exportTransactionUseCase)($dto);
        $filename = sprintf('laporan-transaction-%s-%s.xlsx', $dto->startDate, $dto->endDate);

        return Excel::download(
            new TransactionExportSheet($result),
            $filename,
            \Maatwebsite\Excel\Excel::XLSX,
        );
    }
}
