# 🛠️ Guía para Desarrolladores - Sanchez Estética

Esta guía está diseñada para ayudarte a comprender cómo configurar, desarrollar y contribuir al proyecto **Sanchez Estética**.

---

## 🧱 Estructura General del Proyecto

```
SanchezEsteticaProject/
├── back/                       # Backend con Node.js, Express y TypeORM
├── front/vite-project/        # Frontend con React, Vite y TypeScript
├── README.md                  # Documentación principal del proyecto
├── API_REFERENCE.md           # Documentación técnica de la API
└── User Stories homework 1.docx # Historias de usuario
```

---

## ⚙️ Configuración del Entorno

### Requisitos

- Node.js v16+
- PostgreSQL
- Git

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/LDFuentesAscanio/SanchezEsteticaProject.git
   cd SanchezEsteticaProject
   ```

2. Instala las dependencias del backend:
   ```bash
   cd back
   npm install
   ```

3. Instala las dependencias del frontend:
   ```bash
   cd ../front/vite-project
   npm install
   ```

4. Configura las variables de entorno para el backend (`back/.env`).

5. Ejecuta el backend:
   ```bash
   npm run dev
   ```

6. Ejecuta el frontend:
   ```bash
   npm run dev
   ```

---

## 🧪 Scripts útiles

### Backend

- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm run typeorm migration:run`: Aplica migraciones a la base de datos
- `npm run build`: Compila el código

### Frontend

- `npm run dev`: Ejecuta el proyecto React con Vite
- `npm run build`: Genera la versión de producción

---

## 🔍 Buenas Prácticas

- Utiliza TypeScript y tipos fuertes en todo momento
- Organiza el código en controladores, servicios y rutas (backend)
- Divide los componentes React por responsabilidad (frontend)
- Sigue el estilo del código existente para mantener consistencia

---

## 💡 Contribuir

1. Crea una rama para tu feature:
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   ```

2. Realiza los cambios y haz commits claros:
   ```bash
   git commit -m "Agrega componente para agendar citas"
   ```

3. Sube tu rama y crea un Pull Request:
   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```

---

## 🧼 Estandarización

- Linting: Se recomienda utilizar ESLint con las reglas de Airbnb o Standard
- Formateo: Usa Prettier para mantener el código uniforme

---

## ❓ Soporte

Si tienes dudas o encuentras errores, por favor abre un issue en el repositorio.