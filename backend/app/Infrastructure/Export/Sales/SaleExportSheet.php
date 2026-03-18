<?php

namespace Infrastructure\Export\Sales;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SaleExportSheet implements FromArray, WithHeadings, WithStyles, ShouldAutoSize
{
    public function __construct(private readonly array $data) {}

    public function array(): array
    {
        return array_map(fn ($row) => [
            $row['id'] ?? '',
            $row['user']['name'] ?? '',
            $row['product']['name'] ?? '',
            $row['quantity'] ?? '',
            $row['total_price'] ?? '',
            $row['created_at'] ?? '',
            $row['updated_at'] ?? '',
        ], $this->data);
    }

    public function headings(): array
    {
        return [
            'ID',
            'User',
            'Product',
            'Quantity',
            'Total Price',
            'Created At',
            'Updated At',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true, 'size' => 11]],
        ];
    }
}
