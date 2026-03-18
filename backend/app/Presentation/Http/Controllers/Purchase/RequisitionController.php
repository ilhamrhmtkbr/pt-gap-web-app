<?php

namespace Presentation\Http\Controllers\Purchase;

use Application\Purchase\Requisition\CreateRequisitionUseCase;
use Application\Purchase\Requisition\ExportRequisitionDTO;
use Application\Purchase\Requisition\ExportRequisitionUseCase;
use Application\Purchase\Requisition\GetRequisitionUseCase;
use Application\Purchase\Requisition\RequisitionDTO;
use Barryvdh\DomPDF\Facade\Pdf;
use Domain\Purchase\Models\Requisition;
use Illuminate\Support\Facades\Lang;
use Infrastructure\Export\Purchase\RequisitionExportSheet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Maatwebsite\Excel\Facades\Excel;
use Presentation\Http\Controllers\Controller;
use Presentation\Helper\ResponseApiHelper;
use Presentation\Http\Requests\Purchase\Requisition\CreateRequisitionRequest;
use Presentation\Http\Requests\Purchase\Requisition\ExportRequisitionRequest;
use Presentation\Http\Resources\Purchase\RequisitionResource;

class RequisitionController extends Controller
{
    public function __construct(
        private readonly GetRequisitionUseCase    $getRequisitionUseCase,
        private readonly CreateRequisitionUseCase $createRequisitionUseCase,
        private readonly ExportRequisitionUseCase $exportRequisitionUseCase,
    ) {}

    public function index(Request $request): JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Requisition::class);

        try {
            $filters = $request->only(['search', 'sort_by', 'sort_direction', 'per_page', 'page']);
            return RequisitionResource::collection(($this->getRequisitionUseCase)($filters));
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode(),
            );
        }
    }

    public function show(Requisition $requisition): JsonResponse
    {
        Gate::authorize('view', $requisition);

        return ResponseApiHelper::send(
            Lang::get('request-data.get-success'),
            Response::HTTP_OK,
            new RequisitionResource($requisition),
        );
    }

    public function store(CreateRequisitionRequest $request): JsonResponse
    {
        Gate::authorize('create', Requisition::class);

        try {
            ($this->createRequisitionUseCase)(RequisitionDTO::fromRequest($request->validated()));

            return ResponseApiHelper::send(
                Lang::get('request-data.store-success'),
                Response::HTTP_CREATED,
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function exportPdf(ExportRequisitionRequest $request): \Illuminate\Http\Response
    {
        Gate::authorize('export', Requisition::class);

        $dto    = ExportRequisitionDTO::fromRequest($request->validated());
        $result = ($this->exportRequisitionUseCase)($dto)->toArray();
        $result['data'] = RequisitionResource::collection($result['data'])->resolve();

        $filename = sprintf('laporan-requisition-%s-%s.pdf', $dto->startDate, $dto->endDate);

        $pdf = Pdf::loadView('pdf.purchase.requisition', $result)
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

    public function exportExcel(ExportRequisitionRequest $request): \Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        Gate::authorize('export', Requisition::class);

        $dto      = ExportRequisitionDTO::fromRequest($request->validated());
        $result = ($this->exportRequisitionUseCase)($dto)->toArray();
        $result['data'] = RequisitionResource::collection($result['data'])->resolve();
        $filename = sprintf('laporan-requisition-%s-%s.xlsx', $dto->startDate, $dto->endDate);

        return Excel::download(
            new RequisitionExportSheet($result['data']),
            $filename,
            \Maatwebsite\Excel\Excel::XLSX,
        );
    }
}
