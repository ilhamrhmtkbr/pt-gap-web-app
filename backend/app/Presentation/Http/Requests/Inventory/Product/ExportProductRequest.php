<?php

namespace Presentation\Http\Requests\Inventory\Product;

use Illuminate\Foundation\Http\FormRequest;

class ExportProductRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'start_date' => ['nullable', 'date', 'before_or_equal:end_date'],
            'end_date'   => ['nullable', 'date', 'after_or_equal:start_date'],
            'format'     => ['nullable', 'in:pdf,excel'],
            'group_by'   => ['nullable', 'in:daily,monthly'],
        ];
    }

    public function messages(): array
    {
        return [
            'start_date.before_or_equal' => 'Tanggal mulai tidak boleh lebih besar dari tanggal akhir.',
            'end_date.after_or_equal'    => 'Tanggal akhir tidak boleh lebih kecil dari tanggal mulai.',
        ];
    }
}
