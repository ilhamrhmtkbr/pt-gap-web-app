<?php

namespace Presentation\Http\Controllers\Sales;

use Application\Sales\Sale\ExportSaleDTO;
use Application\Sales\Sale\ExportSaleUseCase;
use Application\Sales\Sale\GetSaleUseCase;
use Barryvdh\DomPDF\Facade\Pdf;
use Domain\Sales\Models\Sale;
use Illuminate\Support\Facades\Lang;
use Infrastructure\Export\Sales\SaleExportSheet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Maatwebsite\Excel\Facades\Excel;
use Presentation\Http\Controllers\Controller;
use Presentation\Helper\ResponseApiHelper;
use Presentation\Http\Requests\Sales\Sale\ExportSaleRequest;
use Presentation\Http\Resources\Sales\SaleResource;

class SaleController extends Controller
{
    public function __construct(
        private readonly GetSaleUseCase    $getSaleUseCase,
        private readonly ExportSaleUseCase $exportSaleUseCase,
    ) {}

    public function index(Request $request): JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Sale::class);

        try {
            $filters = $request->only(['search', 'sort_by', 'sort_direction', 'per_page', 'page']);
            return SaleResource::collection(($this->getSaleUseCase)($filters));
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode(),
            );
        }
    }

    public function show(Sale $sale): JsonResponse
    {
        Gate::authorize('view', $sale);

        return ResponseApiHelper::send(
            Lang::get('request-data.get-success'),
            Response::HTTP_OK,
            new SaleResource($sale),
        );
    }

    public function exportPdf(ExportSaleRequest $request): \Illuminate\Http\Response
    {
        Gate::authorize('export', Sale::class);

        $dto    = ExportSaleDTO::fromRequest($request->validated());
        $result = ($this->exportSaleUseCase)($dto)->toArray();
        $result['data'] = SaleResource::collection($result['data'])->resolve();

        $filename = sprintf('laporan-sale-%s-%s.pdf', $dto->startDate, $dto->endDate);

        $pdf = Pdf::loadView('pdf.sales.sale', $result)
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

    public function exportExcel(ExportSaleRequest $request): \Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        Gate::authorize('export', Sale::class);

        $dto      = ExportSaleDTO::fromRequest($request->validated());
        $result   = ($this->exportSaleUseCase)($dto)->toArray();
        $result['data'] = SaleResource::collection($result['data'])->resolve();

        $filename = sprintf('laporan-sale-%s-%s.xlsx', $dto->startDate, $dto->endDate);

        return Excel::download(
            new SaleExportSheet($result['data']),
            $filename,
            \Maatwebsite\Excel\Excel::XLSX,
        );
    }
}
