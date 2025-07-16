# E‑Ticaret Platformu (Spring Boot & React)

## Açıklama
Bu proje, **Spring Boot** ve **React** + **Tailwind CSS** kullanılarak geliştirilmiş tam özellikli bir e‑ticaret platformudur.  
Backend tarafı ürün, kategori, sepet, sipariş ve kullanıcı yönetimi ile **JWT** tabanlı kimlik doğrulama sağlar. Frontend ise kullanıcı arayüzünü React bileşenleriyle sunar.

---

## Tech Stack
- **Backend**  
  - Java 17+, Spring Boot, Spring Security, JPA/Hibernate, MySQL  
  - JWT ile güvenli API erişimi  
  - MultipartFile desteği ile ürün görseli yükleme  
- **Frontend**  
  - React (Vite), Tailwind CSS, React Router v6  
  - Axios üzerinden REST çağrıları  
  - ProtectedRoute ile oturum kontrolleri  

---

## Temel Özellikler
- *Ürün Yönetimi*  
  - CRUD işlemleri (Admin)  
  - Görsel yükleme/güncelleme  
- *Kategori Yönetimi*  
  - Ürünleri kategorilere ayırma  
- *Alışveriş Sepeti*  
  - Sepete ekleme/çıkarma/temizleme  
  - Miktar güncelleme  
- *Sipariş İşleme*  
  - Sepeti siparişe çevirme  
  - Sipariş geçmişi görüntüleme  
- *Kullanıcı Kimlik Doğrulama*  
  - Kayıt / Giriş (JWT)  
  - Rol tabanlı erişim (ROLE_USER, ROLE_ADMIN)  
- *API & Görsel Güvenliği*  
  - Spring Security ile uç nokta koruması  
  - MultipartFile + Blob + DTO dönüşümleri

---

## Frontend Sayfaları

### 1. **Login**  
- `/`  
- Email & şifre ile giriş  
- Başarılı giriş → token `localStorage`’a kaydedilir, `/products` yönlendirmesi  

### 2. **Products**  
- `/products`  
- Tüm ürünleri ızgara görünümünde listeler  
- “Add to cart” butonu ile sepete ekler  

### 3. **Category List**  
- `/category/:categoryName`  
- Seçilen kategoriye ait ürünleri filtreler  

### 4. **Cart**  
- `/cart`  
- Sepete eklenen ürünleri listeler
- Sepetteki tüm ürünleri temizler "Clean Cart"
- Ürünün miktar arttırma/azaltma, silme
- “Proceed to Checkout” → sipariş oluşturma  

### 5. **User Profile**  
- `/user`  
- Kişisel bilgiler, sipariş geçmişi  
- “Edit Account” → Kullanıcı bilgilerini güncelleme  
- “Delete Account” -> Kullanıcı hesabını silme
- "Log out" -> Çıkış yapma
- Admin için ekstra özellik içerin sekmeler: “Add Product” (Ürün ekleme), “Edit Product” (Ürünü Özeliklerini Değiştirme), “Delete Product”(Ürünü silme) 

#### 5.1 **Add Product** (Admin)  
- Yeni ürün + ürün resimi ekleme  

#### 5.2 **Edit Product** (Admin)  
- Mevcut ürünün bilgilerini güncelleme + resim değişimi  

#### 5.3 **Delete Product** (Admin)  
- Ürün silme

---

## Backend API Endpoints

| Metot        | URL                              | Açıklama                                       | Yetki         |
| ------------ | -------------------------------- | ---------------------------------------------- | ------------- |
| POST         | `/api/v1/auth/login`             | Giriş → JWT döner                              | ―             |
| GET          | `/api/v1/products`               | Tüm ürünleri listeler                          | Authenticated |
| GET          | `/api/v1/products/{id}`          | Tek bir ürünü getirir                          | Authenticated |
| POST         | `/api/v1/products/add`           | Ürün ekler                                     | `ROLE_ADMIN`  |
| PUT          | `/api/v1/products/{id}`          | Ürün günceller                                 | `ROLE_ADMIN`  |
| DELETE       | `/api/v1/products/{id}/delete`   | Ürün siler                                     | `ROLE_ADMIN`  |
| POST         | `/api/v1/images/upload`          | Ürün resmi ekler                               | `ROLE_ADMIN`  |
| PUT          | `/api/v1/images/{imageId}`       | Resim günceller                                | `ROLE_ADMIN`  |
| GET          | `/api/v1/carts`                  | Kullanıcının sepetini getirir                  | Authenticated |
| DELETE       | `/api/v1/carts`                  | Sepeti temizler                                | Authenticated |
| POST         | `/api/v1/cartItems/add`          | Sepete ürün ekler                              | Authenticated |
| PUT          | `/api/v1/cartItems/products/{productId}/cartItems` | Sepet miktar günceller       | Authenticated |
| DELETE       | `/api/v1/cartItems/products/{productId}/cartItems` | Sepetten ürün siler          | Authenticated |
| POST         | `/api/v1/orders/create`          | Sipariş oluşturur                              | Authenticated |
| GET          | `/api/v1/users`                  | Authenticated kullanıcının bilgilerini getirir | Authenticated |
| PUT          | `/api/v1/users`                  | Kullanıcı bilgilerini günceller                | Authenticated |
| DELETE       | `/api/v1/users/delete`           | Hesap silme                                    | Authenticated |


---

## Kurulum ve Çalıştırma

1. ** Backend**  
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run

2. ** Frontend**
   ```bash
   cd client
   npm install
   npm run dev

