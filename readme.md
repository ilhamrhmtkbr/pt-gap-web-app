# Tugas Aplikasi Manajemen Stock Barang dan Pembelian

<div align="center">

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)

[![GitHub license](https://img.shields.io/github/license/ilhamrhmtkbr/pt-gap?style=flat-square)](https://github.com/ilhamrhmtkbr/pt-gap/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/ilhamrhmtkbr/pt-gap?style=flat-square)](https://github.com/ilhamrhmtkbr/pt-gap/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ilhamrhmtkbr/pt-gap?style=flat-square)](https://github.com/ilhamrhmtkbr/pt-gap/network)
[![GitHub issues](https://img.shields.io/github/issues/ilhamrhmtkbr/pt-gap?style=flat-square)](https://github.com/ilhamrhmtkbr/pt-gap/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/ilhamrhmtkbr/pt-gap?style=flat-square)](https://github.com/ilhamrhmtkbr/pt-gap/pulls)

**Aplikasi Manajemen Stok dan Penjualan**

</div>

---

## 🚀 Tentang Project

Tugas ini adalah platform e-commerce sekaligus mini erp. user bisa membeli barang, pembayaran via midtrans dan admin bisa mengelola stock produk

## 🛠️ Tech Stack

### Backend
- **Laravel Framework**
- **Laravel Queue** untuk kirim email setelah register
- **JWT Authentication** untuk keamanan API
- **Domain Driven Design** jika ingin dikembangkan lebih lanjut

### Frontend
- **React.js** untuk semua interface pengguna
- **Tailwind.css** untuk semua interface pengguna
- **Multiple SPAs** untuk setiap role pengguna

### Infrastructure & DevOps
- **Docker & Docker Compose** untuk kontainerisasi
- **Nginx** sebagai entrypoint server
- **GitHub Actions** untuk CD langsung
- **GCP Deployment** (dioptimasi untuk Free Tier)

### Database & Storage
- **MySQL** untuk data utama (masih shared db)
- **Redis** untuk caching

### Third-Party Integrations
- **Midtrans** untuk payment processing dan instructor payouts (beneficiaries/withdraw)
- **Google OAuth** untuk autentikasi di frontend untuk mendapatkan cred email, tetap menggunakan jwt
- **Ngrok** untuk development tunneling

### Fitur Tambahan
- **DomPDF** untuk generate PDF
- **MaatwebsiteExcel** untuk generate Excel
- Email queue processing
- Dokumentasi API lengkap di docs/api

## 📁 Struktur Project

```
olcourse/
├── 🔄 .github/workflow/             # Konfigurasi CD
├── 🌐 backend/                      # API
├── 🐳 docker/                       # Konfigurasi Docker
│   ├── dev/                         # Environment Development
│   ├── prod/                        # Environment Production
├── 📚 docs/                         # Dokumentasi API (OpenAPI)
├── 🖥️ frontend-admin/               # Frontend Admin Management (React)
└── 🌍 frontend-public/              # Website Public (React)
```

## ✨ Fitur Utama

### 👨🎓 Untuk Admin
- 📖 Inventories, Purchases, Sales, Users

### 👨‍🏫 Untuk User
- 📖 Profile, Carts, Transactions

### 🌟 Platform Features
- 🔐 Multi-role authentication system
- 🔔 Email verifikasi notifikasi
- 🔍 Comprehensive search functionality
- 📱 Mobile-responsive design
- 🔌 API-first architecture

## 📋 Prerequisites

Sebelum memulai, pastikan Anda memiliki:

### 1. **Akun Midtrans** untuk payment processing:
- **user payments**: Snap, Payment APIs

### 2. **Akun Ngrok** dengan token autentikasi

### 3. **Google Cloud Console** untuk OAuth:
- Kunjungi [Google Cloud Console](https://console.cloud.google.com/)
- Setup project-id dan api key sesuaikan di masing masing env
- Setup credentials untuk OAuth integration

## 🚀 Cara Memulai

### 1. 🔧 Konfigurasi Environment

**Setup Docker Compose:**
```bash
cd docker/dev
cp docker-compose-untuk-dev-example.yaml docker-compose.yaml
```
- Sesuaikan Ngrok token di service ngrok

**Konfigurasi Backend:**
```bash
cd /backend
cp .env.example .env
```
Sesuaikan:
- MAIL settings
- GOOGLE_CLIENT_ID
- MIDTRANS_CLIENT_KEY
- MIDTRANS_SERVER_KEY

### 2. 🏃‍♂️ Jalankan Aplikasi

```bash
cd docker/dev
sudo docker compose -f docker-compose.yaml up -d
```

### 3. 🔑 Setup Pertama Kali (Wajib)

**Generate JWT Secret:**
```bash
sudo docker container exec -it backend-api-pt-gap sh
php artisan jwt:secret
```

### 4. 🗄️ Setup Database

```bash
sudo docker container exec -it backend-api-pt-gap sh
php artisan migrate:fresh --seed
```

### Fitur Keamanan
- 🔐 JWT-based authentication di semua services
- 👥 Role-based access control
- 💳 Secure payment processing integration
- 🔒 Rate Limiter