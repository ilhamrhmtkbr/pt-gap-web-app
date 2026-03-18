<?php

namespace Presentation\Http\Controllers\Inventory;

use Application\Inventory\Product\CreateProductUseCase;
use Application\Inventory\Product\DeleteProductUseCase;
use Application\Inventory\Product\ExportProductDTO;
use Application\Inventory\Product\ExportProductUseCase;
use Application\Inventory\Product\GetProductUseCase;
use Application\Inventory\Product\UpdateProductUseCase;
use Application\Inventory\Product\ProductDTO;
use Barryvdh\DomPDF\Facade\Pdf;
use Domain\Inventory\Models\Product;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Lang;
use Infrastructure\Export\Inventory\ProductExportSheet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Maatwebsite\Excel\Facades\Excel;
use Presentation\Http\Controllers\Controller;
use Presentation\Helper\ResponseApiHelper;
use Presentation\Http\Requests\Inventory\Product\CreateProductRequest;
use Presentation\Http\Requests\Inventory\Product\ExportProductRequest;
use Presentation\Http\Requests\Inventory\Product\UpdateProductRequest;
use Presentation\Http\Resources\Inventory\ProductResource;

class ProductController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('jwt', except: ['index', 'show']),
            new Middleware(\Illuminate\Routing\Middleware\SubstituteBindings::class),
        ];
    }

    public function __construct(
        private readonly GetProductUseCase    $getProductUseCase,
        private readonly CreateProductUseCase $createProductUseCase,
        private readonly UpdateProductUseCase $updateProductUseCase,
        private readonly DeleteProductUseCase $deleteProductUseCase,
        private readonly ExportProductUseCase $exportProductUseCase,
    ) {
    }

    public function index(Request $request): JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Product::class);

        try {
            $filters = $request->only(['search', 'sort_by', 'sort_direction', 'per_page', 'page']);
            return ProductResource::collection(($this->getProductUseCase)($filters));
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode(),
            );
        }
    }

    public function show(Product $product): JsonResponse
    {
        Gate::authorize('view', $product);

        return ResponseApiHelper::send(
            Lang::get('request-data.get-success'),
            Response::HTTP_OK,
            new ProductResource($product),
        );
    }

    public function store(CreateProductRequest $request): JsonResponse
    {
        Gate::authorize('create', Product::class);

        try {
            $result = ($this->createProductUseCase)(ProductDTO::fromRequest($request->validated()));
            return ResponseApiHelper::send(
                Lang::get('request-data.store-success'),
                Response::HTTP_CREATED,
                new ProductResource($result),
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function update(UpdateProductRequest $request, Product $product): JsonResponse
    {
        Gate::authorize('update', $product);

        try {
            $result = ($this->updateProductUseCase)($product, ProductDTO::fromRequest($request->validated()));

            return ResponseApiHelper::send(
                Lang::get('request-data.update-success'),
                Response::HTTP_OK,
                new ProductResource($result),
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function destroy(Product $product): JsonResponse
    {
        Gate::authorize('delete', $product);

        try {
            ($this->deleteProductUseCase)($product);

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

    public function exportPdf(ExportProductRequest $request): Response
    {
        Gate::authorize('export', Product::class);

        $dto    = ExportProductDTO::fromRequest($request->validated());
        $result = ($this->exportProductUseCase)($dto)->toArray();
        $result['data'] = ProductResource::collection($result['data'])->resolve();

        $filename = sprintf('laporan-product-%s-%s.pdf', $dto->startDate, $dto->endDate);

        $pdf = Pdf::loadView('pdf.inventory.product', $result)
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

    public function exportExcel(ExportProductRequest $request): \Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        Gate::authorize('export', Product::class);

        $dto      = ExportProductDTO::fromRequest($request->validated());
        $result = ($this->exportProductUseCase)($dto)->toArray();
        $result['data'] = ProductResource::collection($result['data'])->resolve();
        $filename = sprintf('laporan-product-%s-%s.xlsx', $dto->startDate, $dto->endDate);

        return Excel::download(
            new ProductExportSheet($result['data']),
            $filename,
            \Maatwebsite\Excel\Excel::XLSX,
        );
    }
}
