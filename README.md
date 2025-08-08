# E‑Ticaret Platformu (Spring Boot & React)

## Açıklama
Bu proje, **Spring Boot** ve **React** + **Tailwind CSS** kullanılarak geliştirilmiş tam özellikli bir e‑ticaret platformudur.  
Backend tarafı ürün, kategori, sepet, sipariş ve kullanıcı yönetimi ile **JWT** tabanlı kimlik doğrulama sağlar. Frontend ise kullanıcı arayüzünü React bileşenleriyle sunar.

---

## Tech Stack
- **Backend**  
  - Java 17+, Spring Boot, Spring Security, JPA/Hibernate, Lombok, MySQL 
  - JWT ile güvenli API erişimi
  - MultipartFile destekli ürün yükleme
  - Kafka ile event-driven mimarisi ve mesaj kuyruğu desteği
  - SMTP tabanlı e-posta bildirim servisi 
  - WebSocket/STOMP ile gerçek zamanlı bildirimler
    
- **Frontend**  
  - React (Vite), Tailwind CSS, React Router v6  
  - Axios üzerinden REST çağrıları  
  - ProtectedRoute ile oturum kontrolleri
  - STOMP/WebSocket client ile gerçek zamanlı bildirimleri gösterme

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
  - E-posta doğrulama ile hesap aktifleştirme
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

### 1. **Register**  
- `/register`  
- Mail onaylama işlemi için SMTP ile maile link gönderimi

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
| POST         | `/api/v1/auth/login`             | Giriş → JWT döner                              |       ―       |
| POST         | `/api/v1/auth/register`          | Kayıt işlemi -> Doğrulama linki gönderilir     |       ―       |
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

## Kafka Event-Driven Akışları ve SMTP

### 🛒 Sipariş Oluşturma Akışı (Order Flow)
1. `OrderService` → `OrderProducer` → Kafka: `order-topic` (OrderEvent)
2. `OrderConsumer` → **Sadece log** (OrderEvent alındı)
3. `EmailTriggerConsumer` → `OrderEvent` → `EmailEvent` üretir
4. `EmailProducer` → Kafka: `email-topic` (EmailEvent)
5. `EmailConsumer` → SMTP ile e-posta gönderir

### 👤 Kullanıcı Silme Akışı (User Flow)
1. `UserService` → `UserProducer` → Kafka: `user-topic` (UserDeletedEvent)
2. `UserConsumer` → **Sadece log** (UserDeletedEvent alındı)
3. `UserEmailTriggerConsumer` → `UserDeletedEvent` → `EmailEvent` üretir
4. `EmailProducer` → Kafka: `email-topic` (EmailEvent)
5. `EmailConsumer` → SMTP ile e-posta gönderir
    
---

## WebSocket Tabanlı Gerçek Zamanlı Bildirimler - Anlık Stok Uyarıları (LowStockAlert)
#### Ürün envanteri belirlenen eşik değerin altına düştüğünde, frontend’e gerçek zamanlı uyarı (toast) iletmek.

###  Özellikler

1. Kullanıcı işlem yapar (sepete ekleme/çıkarma, sipariş vb.).
2. Backend stok kontrolü yapar. Eğer ürün inventory <= LOW_STOCK_THRESHOLD ise uyarı hazırlanır.
3. Publisher, LowStockAlert payload’ını /topic/stock-alerts kanalına yayınlar.
4. Frontend, STOMP ile bu kanala abonedir ve gelen mesajı toast olarak gösterir.
5. Bu sayede, kullanıcılar bir ürünün stokunun azaldığı bilgisini sayfa yenilemesine gerek kalmadan gerçek zamanlı olarak alabilirler.
   
---

## Kurulum ve Çalıştırma

1. **Backend**  
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run

2. **Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   
![login](https://github.com/user-attachments/assets/c3c44e24-952e-4105-8f13-b1445e72d67c)
![register](https://github.com/user-attachments/assets/bc5149dc-9801-429d-b71c-75e6e7cc7f4d)
![product](https://github.com/user-attachments/assets/0e7046fd-e686-4594-9f87-6ab76c364fe5)
![cart](https://github.com/user-attachments/assets/bab2a062-df0f-4ee1-916d-78b6f9a0c983)
![order](https://github.com/user-attachments/assets/0d2739bf-b58e-46d8-b2bc-9258115c965b)
![user](https://github.com/user-attachments/assets/3ac5906f-da89-446f-9741-b44a9602bf1a)
