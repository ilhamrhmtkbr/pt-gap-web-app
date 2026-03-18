<?php

if (!function_exists('rupiah')) {
    function rupiah($amount, $decimal = 2): string
    {
        return 'Rp. ' . number_format($amount, $decimal, ',', '.');
    }
}
