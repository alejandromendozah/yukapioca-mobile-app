# Integración de la App con Odoo

## Introducción

Para un entorno real, la aplicación móvil podría integrarse con Odoo para centralizar la gestión de clientes, sucursales y productos.  
Odoo funcionaría como backend principal y la app consumiría los datos mediante APIs.

---

## Autenticación

El login de la app podría conectarse con Odoo mediante un endpoint de autenticación.

Ejemplo de flujo:

1. El usuario introduce su email y contraseña en la app.
2. La app envía los datos a un endpoint de autenticación en Odoo.
3. Odoo valida las credenciales y devuelve un token de sesión.
4. La app utiliza ese token para realizar futuras solicitudes a la API.

Ejemplo de endpoint:

POST /api/auth/login

El token se enviaría en cada petición mediante headers.

---

## Clientes

Los clientes podrían almacenarse en el modelo estándar de Odoo:

`res.partner`

La app podría consultar información del cliente mediante endpoints como:

GET /api/customers/{id}

Esto permitiría mostrar en la app:

- nombre
- email
- teléfono
- dirección

---

## Sucursales

Las sucursales pueden almacenarse en un modelo personalizado en Odoo.

Ejemplo de endpoint:

GET /api/stores

La app usaría estos datos para:

- mostrar lista de sucursales
- mostrar marcadores en el mapa
- mostrar información de contacto y horarios

---

## Productos de tienda

Los productos pueden utilizar el modelo estándar de Odoo:

`product.template`

Endpoint sugerido:

GET /api/products

La app consumiría estos datos para mostrar:

- catálogo de productos
- detalle de producto
- precios

---

## Sincronización de datos

La app puede obtener los datos directamente desde la API cuando los necesite.  
También se podría implementar cache local para mejorar rendimiento o permitir funcionamiento parcial sin conexión.

---

## Conclusión

Integrar la aplicación con Odoo permitiría centralizar la gestión de clientes, sucursales y productos, facilitando la administración desde un sistema ERP mientras la app móvil funciona como interfaz para los usuarios.