export function removeUnderscoreAndCapitalize(value) {
    let items = value.split("")
    for (let i = 0; i < items.length; i++) {
        if (i === 0) {
            items[i] = items[i].toUpperCase();
        }
        if (items[i].includes('_')) {
            items[i] = ' ';
            items[i + 1] = items[i + 1].toUpperCase()
        }
    }
    return items.join('');
}

export function parseRupiah(value) {
    return parseFloat(
        value
            .replace('Rp.', '')
            .replace(/\s/g, '')
            .replace(/\./g, '')
            .replace(',', '.')
    );
}

export function formatRupiah(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(value);
}
