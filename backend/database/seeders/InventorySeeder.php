<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class InventorySeeder extends Seeder
{
    public function run(): void
    {
        $books = [
            // Inspirasi
            ['name' => 'The Alchemist', 'author' => 'Paulo Coelho', 'tag' => 'inspirasi', 'price' => 88000, 'stock' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['name' => "Man's Search for Meaning", 'author' => 'Viktor E. Frankl', 'tag' => 'inspirasi', 'price' => 75000, 'stock' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Tuesdays with Morrie', 'author' => 'Mitch Albom', 'tag' => 'inspirasi', 'price' => 78000, 'stock' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Educated', 'author' => 'Tara Westover', 'tag' => 'inspirasi', 'price' => 98000, 'stock' => 10, 'created_at' => now(), 'updated_at' => now()],

            // Self-help
            ['name' => 'Atomic Habits', 'author' => 'James Clear', 'tag' => 'self-help', 'price' => 98000, 'stock' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'The Subtle Art of Not Giving a Fck', 'author' => 'Mark Manson', 'tag' => 'self-help', 'price' => 88000, 'stock' => 9, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'The 7 Habits of Highly Effective People', 'author' => 'Stephen R. Covey', 'tag' => 'self-help', 'price' => 105000, 'stock' => 10, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Ikigai', 'author' => 'Hector Garcia', 'tag' => 'self-help', 'price' => 78000, 'stock' => 4, 'created_at' => now(), 'updated_at' => now()],

            // Keuangan
            ['name' => 'The Psychology of Money', 'author' => 'Morgan Housel', 'tag' => 'keuangan', 'price' => 105000, 'stock' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Rich Dad Poor Dad', 'author' => 'Robert T. Kiyosaki', 'tag' => 'keuangan', 'price' => 92000, 'stock' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'The Total Money Makeover', 'author' => 'Dave Ramsey', 'tag' => 'keuangan', 'price' => 95000, 'stock' => 3, 'created_at' => now(), 'updated_at' => now()],

            // Bisnis
            ['name' => 'Zero to One', 'author' => 'Peter Thiel', 'tag' => 'bisnis', 'price' => 102000, 'stock' => 9, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Start With Why', 'author' => 'Simon Sinek', 'tag' => 'bisnis', 'price' => 98000, 'stock' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'The Lean Startup', 'author' => 'Eric Ries', 'tag' => 'bisnis', 'price' => 100000, 'stock' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Build', 'author' => 'Tony Fadell', 'tag' => 'bisnis', 'price' => 108000, 'stock' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Good to Great', 'author' => 'Jim Collins', 'tag' => 'bisnis', 'price' => 98000, 'stock' => 6, 'created_at' => now(), 'updated_at' => now()],

            // Psikologi
            ['name' => 'Thinking Fast and Slow', 'author' => 'Daniel Kahneman', 'tag' => 'psikologi', 'price' => 110000, 'stock' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Outliers', 'author' => 'Malcolm Gladwell', 'tag' => 'psikologi', 'price' => 92000, 'stock' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Blink', 'author' => 'Malcolm Gladwell', 'tag' => 'psikologi', 'price' => 88000, 'stock' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Quiet', 'author' => 'Susan Cain', 'tag' => 'psikologi', 'price' => 95000, 'stock' => 3, 'created_at' => now(), 'updated_at' => now()],

            // Produktivitas
            ['name' => 'Deep Work', 'author' => 'Cal Newport', 'tag' => 'produktivitas', 'price' => 95000, 'stock' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Digital Minimalism', 'author' => 'Cal Newport', 'tag' => 'produktivitas', 'price' => 90000, 'stock' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Getting Things Done', 'author' => 'David Allen', 'tag' => 'produktivitas', 'price' => 92000, 'stock' => 5, 'created_at' => now(), 'updated_at' => now()],

            // Sejarah & Sains
            ['name' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'tag' => 'sejarah', 'price' => 115000, 'stock' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Homo Deus', 'author' => 'Yuval Noah Harari', 'tag' => 'sains', 'price' => 118000, 'stock' => 8, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Guns Germs and Steel', 'author' => 'Jared Diamond', 'tag' => 'sejarah', 'price' => 112000, 'stock' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'A Brief History of Time', 'author' => 'Stephen Hawking', 'tag' => 'sains', 'price' => 108000, 'stock' => 6, 'created_at' => now(), 'updated_at' => now()],

            // Sosial
            ['name' => 'The Tipping Point', 'author' => 'Malcolm Gladwell', 'tag' => 'sosial', 'price' => 90000, 'stock' => 8, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Freakonomics', 'author' => 'Steven D. Levitt', 'tag' => 'sosial', 'price' => 88000, 'stock' => 5, 'created_at' => now(), 'updated_at' => now()],

            // Motivasi & Semangat
            ['name' => "Can't Hurt Me", 'author' => 'David Goggins', 'tag' => 'semangat', 'price' => 100000, 'stock' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Grit', 'author' => 'Angela Duckworth', 'tag' => 'motivasi', 'price' => 92000, 'stock' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Mindset', 'author' => 'Carol S. Dweck', 'tag' => 'motivasi', 'price' => 88000, 'stock' => 8, 'created_at' => now(), 'updated_at' => now()],

            // Spiritual
            ['name' => 'The Power of Now', 'author' => 'Eckhart Tolle', 'tag' => 'spiritual', 'price' => 85000, 'stock' => 2, 'created_at' => now(), 'updated_at' => now()],

            // Fantasi
            ['name' => 'Harry Potter and the Sorcerers Stone', 'author' => 'J.K. Rowling', 'tag' => 'fantasi', 'price' => 120000, 'stock' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Harry Potter and the Chamber of Secrets', 'author' => 'J.K. Rowling', 'tag' => 'fantasi', 'price' => 120000, 'stock' => 9, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Harry Potter and the Prisoner of Azkaban', 'author' => 'J.K. Rowling', 'tag' => 'fantasi', 'price' => 125000, 'stock' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'The Hobbit', 'author' => 'J.R.R. Tolkien', 'tag' => 'fantasi', 'price' => 115000, 'stock' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'The Fellowship of the Ring', 'author' => 'J.R.R. Tolkien', 'tag' => 'fantasi', 'price' => 120000, 'stock' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'A Game of Thrones', 'author' => 'George R.R. Martin', 'tag' => 'fantasi', 'price' => 130000, 'stock' => 5, 'created_at' => now(), 'updated_at' => now()],

            // Fiksi
            ['name' => '1984', 'author' => 'George Orwell', 'tag' => 'fiksi', 'price' => 85000, 'stock' => 8, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Animal Farm', 'author' => 'George Orwell', 'tag' => 'fiksi', 'price' => 72000, 'stock' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Brave New World', 'author' => 'Aldous Huxley', 'tag' => 'fiksi', 'price' => 88000, 'stock' => 4, 'created_at' => now(), 'updated_at' => now()],

            // Fiksi Ilmiah
            ['name' => 'The Martian', 'author' => 'Andy Weir', 'tag' => 'fiksi ilmiah', 'price' => 95000, 'stock' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Dune', 'author' => 'Frank Herbert', 'tag' => 'fiksi ilmiah', 'price' => 115000, 'stock' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['name' => "Ender's Game", 'author' => 'Orson Scott Card', 'tag' => 'fiksi ilmiah', 'price' => 92000, 'stock' => 3, 'created_at' => now(), 'updated_at' => now()],

            // Romance
            ['name' => 'Pride and Prejudice', 'author' => 'Jane Austen', 'tag' => 'romance', 'price' => 78000, 'stock' => 9, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Me Before You', 'author' => 'Jojo Moyes', 'tag' => 'romance', 'price' => 85000, 'stock' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'The Fault in Our Stars', 'author' => 'John Green', 'tag' => 'romance', 'price' => 82000, 'stock' => 8, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'It Ends with Us', 'author' => 'Colleen Hoover', 'tag' => 'romance', 'price' => 88000, 'stock' => 4, 'created_at' => now(), 'updated_at' => now()],

            // Petualangan
            ['name' => 'Into the Wild', 'author' => 'Jon Krakauer', 'tag' => 'petualangan', 'price' => 88000, 'stock' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'The Old Man and the Sea', 'author' => 'Ernest Hemingway', 'tag' => 'petualangan', 'price' => 75000, 'stock' => 4, 'created_at' => now(), 'updated_at' => now()],

            // Humor
            ['name' => 'The Hitchhikers Guide to the Galaxy', 'author' => 'Douglas Adams', 'tag' => 'humor', 'price' => 88000, 'stock' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Good Omens', 'author' => 'Terry Pratchett', 'tag' => 'humor', 'price' => 92000, 'stock' => 3, 'created_at' => now(), 'updated_at' => now()],
        ];

        Storage::disk('public')->makeDirectory('books');

        foreach ($books as $book) {
            $filename = Str::slug($book['name']) . '.jpg';
            $filepath = 'books/' . $filename;

            DB::table('inventory_products')->updateOrInsert(
                ['name' => $book['name']], // kondisi pengecekan
                [
                    'author' => $book['author'],
                    'picture' => $filepath,
                    'tag' => $book['tag'],
                    'price' => $book['price'],
                    'stock' => $book['stock'],
                ]
            );
        }
    }
}
