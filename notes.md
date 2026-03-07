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

# Notas sobre la implementación

## ¿Qué mejorarías para producción?

Para un entorno de producción integraría una API real en lugar de utilizar JSON local para los datos. 
También agregaría manejo más robusto de errores de red, autenticación basada en tokens y almacenamiento seguro de sesión. 
Además implementaría pruebas automatizadas y optimizaciones de rendimiento.

## ¿Qué parte fue más difícil?

La parte más compleja fue sincronizar la lista de sucursales con el mapa. 
En particular lograr que al seleccionar una sucursal desde la lista el mapa hiciera zoom al marcador correspondiente y mostrara su información correctamente.

## ¿Qué agregarías con más tiempo?

Agregaría búsqueda y filtros en la tienda, manejo de cantidades en el carrito y persistencia del carrito. 
También integraría una API real para productos y sucursales y mejoraría algunos detalles de UX y animaciones.
