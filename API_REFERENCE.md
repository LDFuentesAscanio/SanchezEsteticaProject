# 📘 Documentación Técnica de la API - Sanchez Estética

Esta API permite gestionar un sistema de turnos para un centro de estética. A través de sus endpoints se pueden crear, leer, actualizar y eliminar usuarios, citas y servicios.

## 🌐 Base URL

```
http://localhost:3000/api
```

---

## 📂 Endpoints Principales

### 🔐 Autenticación

#### `POST /auth/login`

Inicia sesión con credenciales de usuario.

**Body**:
```json
{
  "email": "usuario@correo.com",
  "password": "123456"
}
```

**Respuesta exitosa**:
```json
{
  "token": "jwt-token-generado",
  "user": {
    "id": 1,
    "name": "Usuario"
  }
}
```

---

### 👤 Usuarios

#### `POST /users`

Crea un nuevo usuario.

**Body**:
```json
{
  "name": "Nombre",
  "email": "usuario@correo.com",
  "password": "123456"
}
```

**Respuesta**: `201 Created`

---

#### `GET /users/:id`

Obtiene la información de un usuario por su ID.

**Respuesta**:
```json
{
  "id": 1,
  "name": "Usuario",
  "email": "usuario@correo.com"
}
```

---

### 📅 Citas

#### `GET /appointments`

Lista todas las citas.

**Respuesta**:
```json
[
  {
    "id": 1,
    "date": "2024-06-01T15:00:00Z",
    "service": "Depilación",
    "userId": 1
  }
]
```

---

#### `POST /appointments`

Crea una nueva cita.

**Body**:
```json
{
  "date": "2024-06-01T15:00:00Z",
  "serviceId": 2,
  "userId": 1
}
```

**Respuesta**: `201 Created`

---

### 💆 Servicios

#### `GET /services`

Lista los servicios disponibles.

**Respuesta**:
```json
[
  {
    "id": 1,
    "name": "Masaje Relajante",
    "duration": 60
  }
]
```

---

## 🔐 Autenticación y Seguridad

- Algunos endpoints requieren token JWT en el header:
```
Authorization: Bearer <token>
```

---

## ⚠️ Errores comunes

| Código | Descripción             |
|--------|--------------------------|
| 400    | Solicitud incorrecta     |
| 401    | No autorizado            |
| 404    | Recurso no encontrado    |
| 500    | Error interno del servidor |

---

## 📌 Notas

- Todas las fechas deben estar en formato ISO 8601.
- Para pruebas locales, usar herramientas como Postman o Insomnia.