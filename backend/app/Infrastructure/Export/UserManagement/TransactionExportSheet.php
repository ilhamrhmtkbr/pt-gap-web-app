<?php

namespace Infrastructure\Export\UserManagement;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class TransactionExportSheet implements FromArray, WithHeadings, WithStyles, ShouldAutoSize
{
    public function __construct(private readonly array $data) {}

    public function array(): array
    {
        return array_map(fn ($row) => [
            // TODO: sesuaikan kolom export
            $row['id'] ?? '',
        ], $this->data);
    }

    public function headings(): array
    {
        return [
            // TODO: sesuaikan header kolom
            'ID',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true, 'size' => 11]],
        ];
    }
}
