# 💆‍♀️ Sanchez Estética Project

**Sanchez Estética** es una aplicación web para la gestión de citas en un consultorio cosmetológico. Permite a los usuarios agendar, modificar y cancelar citas, así como gestionar servicios y horarios disponibles.

## 🚀 Tecnologías Utilizadas

- **Frontend**: React, Vite, TypeScript
- **Backend**: Node.js, TypeScript, Express
- **Base de Datos**: PostgreSQL, TypeORM
- **Control de Versiones**: Git

## 📁 Estructura del Proyecto

```
SanchezEsteticaProject/
├── front/
│   └── vite-project/           # Aplicación frontend con React y Vite
├── back/                       # Aplicación backend con Node.js y Express
├── README.md                   # Documentación del proyecto
├── .gitignore                  # Archivos y carpetas ignorados por Git
└── User Stories homework 1.docx # Documento con historias de usuario
```

## ⚙️ Instalación y Ejecución

### Prerrequisitos

- Node.js (versión recomendada: 16.x o superior)
- PostgreSQL (versión recomendada: 13.x o superior)

### Pasos para el Backend

1. Navega al directorio del backend:
   ```bash
   cd back
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en un archivo `.env`:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=sanchez_estetica
   ```
4. Ejecuta las migraciones para crear las tablas en la base de datos:
   ```bash
   npm run typeorm migration:run
   ```
5. Inicia el servidor:
   ```bash
   npm run dev
   ```

### Pasos para el Frontend

1. Navega al directorio del frontend:
   ```bash
   cd front/vite-project
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:3000`.

## 📝 Historias de Usuario

El documento `User Stories homework 1.docx` contiene las historias de usuario que guiaron el desarrollo de la aplicación. Estas historias describen las funcionalidades desde la perspectiva del usuario final y ayudan a entender los requisitos del sistema.

## 📌 Funcionalidades Principales

- Registro y autenticación de usuarios
- Gestión de citas (crear, modificar, cancelar)
- Visualización de horarios disponibles
- Administración de servicios ofrecidos
- Panel de administración para el personal del consultorio

## 🛠️ Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar:

1. Haz un fork del repositorio.
2. Crea una nueva rama: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz commits: `git commit -m 'Agrega nueva funcionalidad'`.
4. Envía tus cambios al repositorio remoto: `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request detallando tus cambios.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.