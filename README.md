# Ecommerce Platform 🛍️

[![Live Demo](https://img.shields.io/badge/Demo-Vercel-blue?logo=vercel)](https://munnelautaro-ecommerce.vercel.app/)

Una plataforma de comercio electrónico moderna construida con **Next.js**, **React**, **MongoDB** y **Mercado Pago**. Incluye funcionalidades completas de carrito de compras, autenticación de usuarios y panel de administración.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Routes](#api-routes)
- [Rutas Principales](#rutas-principales)
- [Testing](#testing)
- [Contribuir](#contribuir)

---

## ✨ Características

### Para Usuarios

- ✅ Autenticación y registro seguro con bcryptjs
- ✅ Catálogo de productos con categorías
- ✅ Filtrado y búsqueda de productos
- ✅ Carrito de compras persistente
- ✅ Checkout seguro
- ✅ Integración con **Mercado Pago** para pagos
- ✅ Historial de órdenes
- ✅ Perfil de usuario editable
- ✅ Reservas de productos

### Para Administradores

- 🔧 Panel de administración completo
- 🔧 Gestión de usuarios (CRUD)
- 🔧 Gestión de productos (CRUD)
- 🔧 Gestión de categorías
- 🔧 Gestión de órdenes
- 🔧 Monitoreo y analytics
- 🔧 Configuración de reservas

---

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js** 15.5 - Framework React de producción
- **React** 19 - Librería UI
- **Tailwind CSS** 4 - Estilos y diseño
- **React Toastify** - Notificaciones
- **Lucide React** - Iconografía

### Backend

- **Node.js** - Runtime de JavaScript
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Next.js API Routes** - Endpoints REST

### Autenticación & Seguridad

- **bcryptjs** - Hash de contraseñas
- **jose** - JWT (JSON Web Tokens)
- **cookies-next** - Gestión de cookies
- **Google Auth Library** - Autenticación con Google

### Pagos

- **Mercado Pago SDK** - Procesamiento de pagos

### Testing & Desarrollo

- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes
- **ESLint** - Linting
- **Babel** - Transpilación de código

---

## 🚀 Instalación

### Requisitos Previos

- Node.js 16+
- npm o yarn
- MongoDB local o Atlas

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/MunneLautaro/Ecommerce.git
cd Ecommerce
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**
   Crear archivo `.env.local` en la raíz del proyecto:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce
# o usar MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# Seguridad & Sesión
SESSION_SECRET=tu_session_secret_aqui_minimo_32_caracteres

# Mercado Pago
NEXT_PUBLIC_MP_PUBLIC_KEY=tu_public_key_mercado_pago
MP_ACCESS_TOKEN=tu_access_token_mercado_pago
MP_WEBHOOK_SECRET=tu_webhook_secret_mercado_pago

# Google Auth (opcional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_client_id_google
GOOGLE_CLIENT_SECRET=tu_client_secret_google

# URL de la Aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Sembrar base de datos (opcional)**

```bash
npm run seed
```

5. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

Acceder a `http://localhost:3000`

---

## ⚙️ Configuración

### Variables de Entorno Detalladas

| Variable                       | Descripción                                            | Requerida |
| ------------------------------ | ------------------------------------------------------ | --------- |
| `MONGODB_URI`                  | URL de conexión a MongoDB                              | ✅ Sí     |
| `SESSION_SECRET`               | Clave secreta para firmar cookies (mín. 32 caracteres) | ✅ Sí     |
| `NEXT_PUBLIC_MP_PUBLIC_KEY`    | Clave pública de Mercado Pago                          | ✅ Sí     |
| `MP_ACCESS_TOKEN`              | Token de acceso Mercado Pago                           | ✅ Sí     |
| `MP_WEBHOOK_SECRET`            | Secreto webhook de Mercado Pago                        | ✅ Sí     |
| `NEXT_PUBLIC_APP_URL`          | URL base de la aplicación                              | ✅ Sí     |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | ID de cliente Google OAuth                             | ❌ No     |
| `GOOGLE_CLIENT_SECRET`         | Secreto cliente Google OAuth                           | ❌ No     |

### Base de Datos

El proyecto usa **MongoDB** con **Mongoose** como ODM. Los modelos principales son:

- **User** - Usuarios del sistema
- **Product** - Productos del catálogo
- **Category** - Categorías de productos
- **Order** - Órdenes de compra
- **Reservation** - Reservas de productos

---

## 📖 Uso

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Genera build optimizado
npm start            # Inicia servidor de producción

# Testing
npm test             # Ejecuta tests
npm run jest         # Ejecuta tests en modo watch

# Utilidades
npm run lint         # Verifica código con ESLint
npm run seed         # Siembra la base de datos
```

### Flujo Principal del Usuario

1. **Registro/Login** → `/login`
2. **Explorar productos** → `/` (Home con catálogo)
3. **Filtrar por categoría** → `/categorieItems`
4. **Agregar al carrito** → Carrito flotante
5. **Checkout** → `/buy`
6. **Pago con Mercado Pago** → Integración MercadoPago
7. **Ver órdenes** → `/profile` (Perfil de usuario)

### Acceso Administrador

- URL: `/adminPage`
- Requiere permisos de administrador
- Panel central para gestionar todos los aspectos de la plataforma

---

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Rutas y layouts de Next.js
│   ├── api/               # Endpoints API
│   ├── adminPage/         # Panel de administración
│   ├── categorieItems/    # Página de categorías
│   ├── login/             # Página de login
│   ├── profile/           # Perfil de usuario
│   ├── buy/               # Checkout y pago
│   └── prods/             # Gestión de productos
├── components/            # Componentes React reutilizables
│   ├── Cart/             # Carrito de compras
│   ├── Checkout/         # Componentes de checkout
│   ├── LoginForm/        # Formulario de login
│   ├── ProductCard/      # Tarjetas de productos
│   ├── Orders/           # Gestión de órdenes
│   └── ...
├── contexts/             # Context API para estado global
│   ├── CartContext.js
│   ├── ProductContext.js
│   ├── SessionContext.js
│   └── ...
├── controllers/          # Lógica de negocios
│   ├── products.js
│   ├── users.js
│   ├── orders.js
│   └── ...
├── models/               # Esquemas de MongoDB
│   ├── userModel.js
│   ├── productModel.js
│   ├── orderModel.js
│   └── ...
├── hooks/                # Custom React hooks
│   ├── useCart.js
│   ├── useFetchProducts.js
│   └── ...
├── helpers/              # Funciones auxiliares
│   ├── validatePassword.js
│   ├── capitalizeText.js
│   └── ...
├── actions/              # Server actions de Next.js
│   ├── logIn.js
│   ├── product.js
│   └── ...
├── reducers/             # Reductores para Context API
│   ├── cartReducer.js
│   ├── productReducer.js
│   └── ...
└── lib/                  # Librerías y configuraciones
    ├── session.js
    └── mercadopago.js
```

---

## 🔌 Server Actions y Endpoints

El proyecto utiliza principalmente **Next.js Server Actions** para manejar la lógica del servidor, con API Routes mínimas para casos específicos.

### Server Actions (src/actions/)

#### Autenticación & Usuarios

- `login()` - Login de usuario
- `logout()` - Cerrar sesión
- `addUserAction()` - Crear usuario (admin)
- `modUserAction()` - Modificar usuario (admin)
- `deleteUserAction()` - Eliminar usuario (admin)

#### Productos

- `addProductAction()` - Crear producto (admin)
- `modProductAction()` - Modificar producto (admin)
- `deleteProductAction()` - Eliminar producto (admin)
- `getProductsAction()` - Obtener productos

#### Órdenes

- `createOrderAction()` - Crear orden
- `getOrdersAction()` - Obtener órdenes del usuario
- `modOrderAction()` - Modificar orden (admin)

#### Categorías

- `addCategoryAction()` - Crear categoría (admin)
- `modCategoryAction()` - Modificar categoría (admin)
- `deleteCategoryAction()` - Eliminar categoría (admin)

#### Reservaciones

- `createReservationAction()` - Crear reservación
- `deleteReservationAction()` - Eliminar reservación

### API Routes (Casos Específicos)

#### Autenticación

- `GET /api/auth/google` - Login con Google OAuth

#### Sesión

- `GET /api/session` - Obtener información de sesión actual

#### Webhooks

- `POST /api/webhooks/mercadopago` - Webhooks de Mercado Pago para confirmación de pagos

---

## 🗺️ Rutas Principales

| Ruta                | Descripción                  | Acceso      |
| ------------------- | ---------------------------- | ----------- |
| `/`                 | Home - Catálogo de productos | Público     |
| `/login`            | Página de login/registro     | Público     |
| `/profile`          | Perfil de usuario            | Autenticado |
| `/categorieItems`   | Productos por categoría      | Público     |
| `/prods`            | Gestión de productos         | Admin       |
| `/buy`              | Carrito y checkout           | Autenticado |
| `/buy/success`      | Confirmación de pago         | Autenticado |
| `/buy/failure`      | Error en pago                | Autenticado |
| `/adminPage`        | Panel de administración      | Admin       |
| `/adminPage/orders` | Gestión de órdenes           | Admin       |

---

## 🧪 Testing

El proyecto usa **Jest** y **React Testing Library** para testing.

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run jest

# Ver cobertura
npm test -- --coverage
```

### Estructura de Tests

```
test/
├── test-utils.jsx       # Utilidades para testing
├── custom-queries.js    # Queries personalizadas
└── mock.js             # Mocks para tests
```

**Nota:** El proyecto está en transición hacia TDD (Test-Driven Development).

---

## 👥 Política de Contribuciones

⚠️ **Este es un proyecto privado en desarrollo activo. NO se aceptan contribuciones externas.**

- **No se aceptan Pull Requests** de usuarios externos
- **No se responden Issues** públicos
- **El repositorio es de solo lectura** para usuarios sin permisos

Si necesitas reportar un bug o tienes sugerencias, contacta directamente al equipo de desarrollo.

### Para el Equipo de Desarrollo

Si eres parte del equipo:

1. Crear una rama para tu feature: `git checkout -b feature/AmazingFeature`
2. Commit los cambios: `git commit -m 'Add AmazingFeature'`
3. Push a la rama: `git push origin feature/AmazingFeature`
4. Hacer push directo sin necesidad de Pull Request

**Estándares de código:**

- Mantener coherencia de idioma (preferiblemente inglés en código)
- Seguir la estructura de carpetas existente
- Escribir código limpio y documentado
- Agregar tests para nuevas funcionalidades
- Mantener las ramas de desarrollo limpias

---

## 📝 Notas de Desarrollo

### Próximas Mejoras

- [ ] Mejorar responsive design del carrito
- [ ] Expandir cobertura de tests
- [ ] Optimizar imágenes y lazy loading
- [ ] Implementar SSR para mejor SEO

### Problemas Conocidos

- Revisión de carpetas `public` que contienen archivos innecesarios
- Revisar definiciones de fuentes en el layout
- Unificar naming convention (español/inglés)

---

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados.

---

**Última actualización:** Abril 2026
