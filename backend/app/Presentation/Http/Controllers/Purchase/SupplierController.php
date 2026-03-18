<?php

namespace Presentation\Http\Controllers\Purchase;

use Application\Purchase\Supplier\CreateSupplierUseCase;
use Application\Purchase\Supplier\DeleteSupplierUseCase;
use Application\Purchase\Supplier\ExportSupplierDTO;
use Application\Purchase\Supplier\ExportSupplierUseCase;
use Application\Purchase\Supplier\GetSupplierUseCase;
use Application\Purchase\Supplier\UpdateSupplierUseCase;
use Application\Purchase\Supplier\SupplierDTO;
use Barryvdh\DomPDF\Facade\Pdf;
use Domain\Purchase\Models\Supplier;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Infrastructure\Export\Purchase\SupplierExportSheet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Maatwebsite\Excel\Facades\Excel;
use Presentation\Http\Controllers\Controller;
use Presentation\Helper\ResponseApiHelper;
use Presentation\Http\Requests\Purchase\Supplier\CreateSupplierRequest;
use Presentation\Http\Requests\Purchase\Supplier\ExportSupplierRequest;
use Presentation\Http\Requests\Purchase\Supplier\UpdateSupplierRequest;
use Presentation\Http\Resources\Purchase\SupplierResource;

class SupplierController extends Controller
{
    public function __construct(
        private readonly GetSupplierUseCase    $getSupplierUseCase,
        private readonly CreateSupplierUseCase $createSupplierUseCase,
        private readonly UpdateSupplierUseCase $updateSupplierUseCase,
        private readonly DeleteSupplierUseCase $deleteSupplierUseCase,
        private readonly ExportSupplierUseCase $exportSupplierUseCase,
    ) {}

    public function index(Request $request): JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Supplier::class);

        try {
            $filters = $request->only(['search', 'sort_by', 'sort_direction', 'per_page', 'page']);
            return SupplierResource::collection(($this->getSupplierUseCase)($filters));
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode(),
            );
        }
    }

    public function show(Supplier $supplier): JsonResponse
    {
        Gate::authorize('view', $supplier);

        return ResponseApiHelper::send(
            Lang::get('request-data.get-success'),
            Response::HTTP_OK,
            new SupplierResource($supplier),
        );
    }

    public function store(CreateSupplierRequest $request): JsonResponse
    {
        Gate::authorize('create', Supplier::class);

        try {
            $result = ($this->createSupplierUseCase)(SupplierDTO::fromRequest($request->validated()));
            return ResponseApiHelper::send(
                Lang::get('request-data.store-success'),
                Response::HTTP_CREATED,
                new SupplierResource($result),
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function update(UpdateSupplierRequest $request, Supplier $supplier): JsonResponse
    {
        Gate::authorize('update', $supplier);

        try {
            $result = ($this->updateSupplierUseCase)($supplier, SupplierDTO::fromRequest($request->validated()));

            return ResponseApiHelper::send(
                Lang::get('request-data.update-success'),
                Response::HTTP_OK,
                new SupplierResource($result),
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function destroy(Supplier $supplier): JsonResponse
    {
        Gate::authorize('delete', $supplier);

        try {
            ($this->deleteSupplierUseCase)($supplier);

            return ResponseApiHelper::send(
                Lang::get('request-data.destroy-success'),
                Response::HTTP_OK,
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function exportPdf(ExportSupplierRequest $request): \Illuminate\Http\Response
    {
        Gate::authorize('export', Supplier::class);

        $dto    = ExportSupplierDTO::fromRequest($request->validated());
        $result = ($this->exportSupplierUseCase)($dto)->toArray();
        $result['data'] = SupplierResource::collection($result['data'])->resolve();

        $filename = sprintf('laporan-supplier-%s-%s.pdf', $dto->startDate, $dto->endDate);

        $pdf = Pdf::loadView('pdf.purchase.supplier', $result)
            ->setPaper('a4', 'portrait')
            ->setOptions([
                'defaultFont'          => 'DejaVu Sans',
                'isHtml5ParserEnabled' => true,
                'isRemoteEnabled'      => false,
                'dpi'                  => 150,
                'chroot'               => public_path(),
            ]);

        return $pdf->download($filename);
    }

    public function exportExcel(ExportSupplierRequest $request): \Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        Gate::authorize('export', Supplier::class);

        $dto      = ExportSupplierDTO::fromRequest($request->validated());
        $result   = ($this->exportSupplierUseCase)($dto)->toArray();
        $result['data'] = SupplierResource::collection($result['data'])->resolve();
        $filename = sprintf('laporan-supplier-%s-%s.xlsx', $dto->startDate, $dto->endDate);

        return Excel::download(
            new SupplierExportSheet($result['data']),
            $filename,
            \Maatwebsite\Excel\Excel::XLSX,
        );
    }
}
