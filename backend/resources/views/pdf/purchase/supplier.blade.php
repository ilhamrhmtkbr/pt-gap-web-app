<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 11px; }
        .header { text-align: center; margin-bottom: 20px; }
        .company-name { font-size: 16px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ccc; padding: 6px 8px; }
        th { background: #f0f0f0; font-weight: bold; }
        .footer { margin-top: 30px; font-size: 10px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-name">PT. GAP</div>
        <div>Laporan Supplier</div>
        <div>Periode: {{ $meta['period'] ?? '' }}</div>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Created At</th>
                <th>Updated At</th>
            </tr>
        </thead>
        <tbody>
            @forelse($data as $i => $row)
            <tr>
                <td>{{ $i + 1 }}</td>
                <td>{{$row['name']}}</td>
                <td>{{$row['address']}}</td>
                <td>{{$row['created_at']}}</td>
                <td>{{$row['updated_at']}}</td>
            </tr>
            @empty
            <tr><td colspan="99" style="text-align:center">Tidak ada data.</td></tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Dicetak: {{ $meta['generated_at'] ?? '' }} oleh {{ $meta['generated_by'] ?? '' }}
    </div>
</body>
</html>
