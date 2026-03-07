# Notes md

Durante el desarrollo de la aplicación se implementó una solución simple utilizando datos locales en archivos JSON para simular una API.

Esto permitió desarrollar y probar las funcionalidades principales sin depender de un backend real.

## Supuestos

- El login se implementó como un **mock local** utilizando `users.json`.
- Los datos de sucursales y productos se cargan desde archivos JSON locales.
- El carrito es únicamente una simulación y no está conectado a un sistema de pagos.

## Posibles mejoras

Si la aplicación se llevara a un entorno real se podrían implementar mejoras como:

- Integración con una API real o backend.
- Manejo de autenticación con tokens.
- Sincronización de datos con un ERP como Odoo.
- Persistencia del carrito de compras.
- Manejo offline más robusto.
- Mejoras en diseño visual y animaciones.

## Consideraciones

Se priorizó una arquitectura simple y clara para facilitar la lectura del código y el mantenimiento del proyecto.