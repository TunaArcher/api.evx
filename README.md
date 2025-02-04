# 🚗 Evx Charging - Backend API

Evx Charging เป็น API backend สำหรับให้บริการข้อมูลสถานีชาร์จรถยนต์ไฟฟ้า (EV) พัฒนาด้วย **Node.js** และ **Express.js** พร้อมรองรับการเชื่อมต่อกับฐานข้อมูล **MongoDB / PostgreSQL**

## 📌 คุณสมบัติของ API
- 🔍 **ให้ข้อมูลสถานีชาร์จ** ทั้งหมด
- 📍 **แสดงตำแหน่ง** ของสถานีชาร์จในรูปแบบ JSON
- ⚡ **รองรับการกรองสถานีชาร์จ** ตามประเภทหัวชาร์จ, ความพร้อมใช้งาน
- 📊 **ระบบรีวิวและให้คะแนน** สถานีชาร์จ
- 🔗 **เชื่อมต่อ API ภายนอก** เพื่อนำเข้าข้อมูลสถานีชาร์จ
- 👤 **ระบบบัญชีผู้ใช้** (สมัครสมาชิก, ล็อกอิน, Token Authentication)

## 🏗 เทคโนโลยีที่ใช้
- **Node.js** (Express.js) - Framework สำหรับ API
- **MongoDB / PostgreSQL** - ใช้เป็น Database
- **JWT (JSON Web Token)** - ใช้สำหรับ Authentication
- **RESTful API** - ออกแบบ API ให้เป็นมาตรฐาน

## 🔧 การติดตั้งและใช้งาน
### 1️⃣ การติดตั้ง Backend API
```sh
# Clone โปรเจกต์ API
git clone https://github.com/TunaArcher/api.evx.git
cd api.evx

# ติดตั้ง dependencies
npm install

# กำหนดค่าตัวแปรสภาพแวดล้อม
cp .env.example .env

# Run server
npm start
```

## 📌 ตัวอย่างการเรียก API
### 🔹 Get All Charging Stations
```http
GET /api/charging-stations
```
**Response**
```json
[
  {
    "id": "1",
    "name": "EV Station A",
    "location": {
      "lat": 13.7563,
      "lng": 100.5018
    },
    "available": true,
    "charging_type": "Fast Charging"
  }
]
```

## 🔒 การยืนยันตัวตน (Authentication)
### 🔹 ลงทะเบียนผู้ใช้
```http
POST /api/auth/register
```
**Request Body**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "securepassword"
}
```

## 📜 License
โปรเจกต์นี้อยู่ภายใต้สัญญาอนุญาต MIT License - ดูไฟล์ [LICENSE](LICENSE) สำหรับรายละเอียดเพิ่มเติม

---
