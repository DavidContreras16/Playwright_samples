# Playwright API Testing — NestJS Demo

API REST construida con NestJS y probada con Playwright. Cubre validación de status codes, estructura del body y response time.

---

## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/DavidZelaya12/Playwright_samples.git
cd Playwright_samples/playwright_tests

# 2. Instalar dependencias
npm install

# 3. Instalar el browser de Playwright (solo la primera vez)
npx playwright install chromium
```

---

## Compilar el proyecto

Los tests levantan el servidor desde el build compilado, por lo que hay que compilar antes de correr los tests.

```bash
npm run build
```

---

## Correr los tests

```bash
npm run test:pw
```

Playwright levanta el servidor automáticamente, ejecuta los tests y lo apaga al terminar.

---

## Endpoints disponibles

Base URL: `http://localhost:3000/api`

| Método | Ruta               | Descripción                  |
|--------|--------------------|------------------------------|
| GET    | `/persons`         | Lista todas las personas     |
| GET    | `/persons/:id`     | Obtiene una persona por ID   |
| POST   | `/persons`         | Crea una nueva persona       |
| PUT    | `/persons/:id`     | Actualiza una persona        |
| DELETE | `/persons/:id`     | Elimina una persona          |
| POST   | `/persons/reset`   | Restaura los datos al seed   |

---

## Qué validan los tests

| Categoría        | Qué se verifica                                              |
|------------------|--------------------------------------------------------------|
| **Status codes** | Cada ruta retorna el código HTTP correcto (200, 201, 204, 404) |
| **Body**         | La respuesta tiene la estructura y los datos esperados       |
| **Response time**| Las rutas responden en menos de 200ms                        |

---

## Servidor en modo desarrollo (opcional)

Si quieres correr el servidor manualmente para explorar la API:

```bash
npm run start:dev
```

La API quedará disponible en `http://localhost:3000/api/persons`.
