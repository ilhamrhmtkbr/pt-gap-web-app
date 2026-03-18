<?php

namespace Infrastructure\Export\Purchase;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SupplierExportSheet implements FromArray, WithHeadings, WithStyles, ShouldAutoSize
{
    public function __construct(private readonly array $data) {}

    public function array(): array
    {
        return array_map(fn ($row) => [
            $row['id'] ?? '',
            $row['name'] ?? '',
            $row['address'] ?? '',
            $row['created_at'] ?? '',
            $row['updated_at'] ?? '',
        ], $this->data);
    }

    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Address',
            'Created at',
            'Updated at',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true, 'size' => 11]],
        ];
    }
}
