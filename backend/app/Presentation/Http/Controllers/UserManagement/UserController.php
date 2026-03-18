<?php

namespace Presentation\Http\Controllers\UserManagement;

use Application\UserManagement\User\DeleteUserUseCase;
use Application\UserManagement\User\ExportUserDTO;
use Application\UserManagement\User\ExportUserUseCase;
use Application\UserManagement\User\GetUserUseCase;
use Application\UserManagement\User\UpdateUserUseCase;
use Application\UserManagement\User\UserDTO;
use Barryvdh\DomPDF\Facade\Pdf;
use Domain\UserManagement\Models\User;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Lang;
use Infrastructure\Export\UserManagement\UserExportSheet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Maatwebsite\Excel\Facades\Excel;
use Presentation\Http\Controllers\Controller;
use Presentation\Helper\ResponseApiHelper;
use Presentation\Http\Requests\UserManagement\User\ExportUserRequest;
use Presentation\Http\Requests\UserManagement\User\UpdateUserRequest;
use Presentation\Http\Resources\UserManagement\UserResource;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('jwt'),
            new Middleware(\Illuminate\Routing\Middleware\SubstituteBindings::class),
        ];
    }

    public function __construct(
        private readonly GetUserUseCase    $getUserUseCase,
        private readonly UpdateUserUseCase $updateUserUseCase,
        private readonly DeleteUserUseCase $deleteUserUseCase,
        private readonly ExportUserUseCase $exportUserUseCase,
    ) {}

    public function index(Request $request): JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        Gate::authorize('viewAny', User::class);

        try {
            $filters = $request->only(['search', 'sort_by', 'sort_direction', 'per_page', 'page']);
            return UserResource::collection(($this->getUserUseCase)($filters));
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode(),
            );
        }
    }

    public function show(User $user): JsonResponse
    {
        Gate::authorize('view', $user);

        return ResponseApiHelper::send(
            Lang::get('request-data.get-success'),
            Response::HTTP_OK,
            new UserResource($user),
        );
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        Gate::authorize('update', $user);

        try {
            $result = ($this->updateUserUseCase)($user, UserDTO::fromRequest($request->validated()));

            return ResponseApiHelper::send(
                Lang::get('request-data.update-success'),
                Response::HTTP_OK,
                new UserResource($result),
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function destroy(User $user): JsonResponse
    {
        Gate::authorize('delete', $user);

        try {
            ($this->deleteUserUseCase)($user);

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

    public function exportPdf(ExportUserRequest $request): \Illuminate\Http\Response
    {
        Gate::authorize('export', User::class);

        $dto    = ExportUserDTO::fromRequest($request->validated());
        $result = ($this->exportUserUseCase)($dto)->toArray();
        $result['data'] = UserResource::collection($result['data'])->resolve();

        $filename = sprintf('laporan-user-%s-%s.pdf', $dto->startDate, $dto->endDate);

        $pdf = Pdf::loadView('pdf.usermanagement.user', $result)
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

    public function exportExcel(ExportUserRequest $request): \Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        Gate::authorize('export', User::class);

        $dto      = ExportUserDTO::fromRequest($request->validated());
        $result = ($this->exportUserUseCase)($dto)->toArray();
        $result['data'] = UserResource::collection($result['data'])->resolve();
        $filename = sprintf('laporan-user-%s-%s.xlsx', $dto->startDate, $dto->endDate);

        return Excel::download(
            new UserExportSheet($result['data']),
            $filename,
            \Maatwebsite\Excel\Excel::XLSX,
        );
    }
}
