# Stock · UPB

Panel de productos en React + TypeScript + Vite, compatible con [backendUpbtest](https://github.com/clauOrellanaA/backendUpbtest).

## Iniciar

Requiere Node.js 20.19+ o 22.12+ y el backend funcionando con PostgreSQL configurado.

```bash
npm install
cp .env.example .env
npm run dev
```

En PowerShell puedes copiar la configuración con `Copy-Item .env.example .env`. Si PowerShell bloquea scripts de npm, usa `npm.cmd install` y `npm.cmd run dev`.

Abre la dirección que muestra Vite (normalmente http://127.0.0.1:5173). El frontend usa `http://localhost:3000/api` por defecto. Para otro servidor, modifica `VITE_API_URL` en `.env` y reinicia Vite. El backend ya habilita CORS. En producción usa una API HTTPS accesible desde el navegador.

## Funciones

- Listado real de productos, creación, edición y eliminación con confirmación.
- Búsqueda por nombre y filtros de existencias sobre el catálogo cargado.
- Orden por fecha de alta (ID descendente), nombre o precio; paginación de ocho filas.
- Indicadores globales y exportación CSV de los resultados filtrados.
- Estados de carga, error y catálogo vacío, sin datos ficticios.
- Diseño responsive, formularios validados y diálogos accesibles.

La moneda de presentación es BOB (Bs). Stock bajo significa entre 1 y 5 unidades; es un criterio visual del frontend. Los indicadores siempre consideran el catálogo completo.

## Contrato de API

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | /api/productos | Listar |
| GET | /api/productos/buscar?nombre=texto | Buscar (disponible en el servicio; la interfaz filtra localmente) |
| POST | /api/productos | Crear |
| PUT | /api/productos/:id | Editar |
| DELETE | /api/productos/:id | Eliminar (204) |

POST y PUT envían `{ nombre, precio, stock }`. La API devuelve `{ id, nombre, precio, stock, createdAt }` y errores `{ error: string }`.

## Compilar

```bash
npm run build
npm run preview
```

La compilación comprueba TypeScript y genera `dist/`. Las fuentes de Google son opcionales: si no están disponibles, se usan fuentes del sistema.
