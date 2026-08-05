import { describe, it, expect } from 'vitest';
import { registerEndpoint } from '@nuxt/test-utils/runtime';
import { useAdminProduct } from '../../app/composables/admin/useAdminProduct';
import type { Product } from '../../shared/types/product';

/**
 * ==============================================================================
 * Pruebas Unitarias: Composable `useAdminProduct` con @nuxt/test-utils
 * ==============================================================================
 * 
 * ¿Qué evalúa este archivo de pruebas?
 * 1. Inicialización del composable `useAdminProduct(id)` obteniendo datos con `useFetch`.
 * 2. Método `createOrUpdate`:
 *    - Creación de un nuevo producto (id = 0) enviando una petición POST.
 *    - Actualización de un producto existente (id > 0) enviando un FormData por PATCH.
 * 
 * Usamos `registerEndpoint` de `@nuxt/test-utils/runtime` para interceptar de forma
 * limpia las peticiones `$fetch` y `useFetch` en el entorno de Nuxt.
 */

// Registrar los endpoints simulados en el servidor de pruebas de Nuxt
registerEndpoint('/api/admin/product/1', () => ({
  id: 1,
  name: 'Producto Prueba',
  slug: 'producto-prueba',
  price: 100,
  description: 'Descripción de prueba',
  images: [],
  tags: [],
}));

registerEndpoint('/api/admin/product', {
  method: 'POST',
  handler: () => ({
    message: 'Product created successfully',
    product: {
      id: 99,
      slug: 'nuevo-servicio',
      name: 'Nuevo Servicio',
      description: 'Descripción del nuevo servicio',
      price: 150,
      images: [],
      tags: ['servicio', 'nuevo'],
    },
  }),
});

registerEndpoint('/api/admin/product/5', {
  method: 'PATCH',
  handler: () => ({
    message: 'Product updated',
    product: {
      id: 5,
      slug: 'servicio-actualizado',
      name: 'Servicio Actualizado',
      description: 'Nueva descripción',
      price: 200,
      images: [],
      tags: [],
    },
  }),
});

describe('Composable: useAdminProduct', () => {

  /**
   * Test 1: Obtención de información de producto (useFetch)
   * Verifica que `useAdminProduct('1')` consulte el endpoint mockeado y retorne los datos.
   */
  it('debe obtener la información del producto mediante useFetch', async () => {
    const result = await useAdminProduct('1');

    expect(result.data.value).toBeDefined();
    expect(result.data.value?.id).toBe(1);
    expect(result.data.value?.name).toBe('Producto Prueba');
    expect(typeof result.createOrUpdate).toBe('function');
  });

  /**
   * Test 2: Creación de un nuevo producto (POST)
   * Cuando productData.id === 0, createOrUpdate efectúa un POST al endpoint registrado.
   */
  it('debe crear un nuevo producto mediante POST cuando id === 0', async () => {
    const newProductData: Partial<Product> = {
      id: 0,
      slug: 'nuevo-servicio',
      name: 'Nuevo Servicio',
      description: 'Descripción del nuevo servicio',
      price: 150,
      images: [],
      tags: ['servicio', 'nuevo'],
    };

    const { createOrUpdate } = await useAdminProduct('new');
    const createdProduct = await createOrUpdate(newProductData);

    expect(createdProduct).toBeDefined();
    expect(createdProduct.id).toBe(99);
    expect(createdProduct.name).toBe('Nuevo Servicio');
  });

  /**
   * Test 3: Actualización de un producto existente (PATCH)
   * Cuando productData.id > 0, createOrUpdate envía un FormData mediante PATCH.
   */
  it('debe actualizar un producto existente mediante PATCH cuando id > 0', async () => {
    const existingProductData: Partial<Product> = {
      id: 5,
      slug: 'servicio-actualizado',
      name: 'Servicio Actualizado',
      description: 'Nueva descripción',
      price: 200,
    };

    const { createOrUpdate } = await useAdminProduct('5');
    const updatedProduct = await createOrUpdate(existingProductData);

    expect(updatedProduct).toBeDefined();
    expect(updatedProduct.id).toBe(5);
    expect(updatedProduct.name).toBe('Servicio Actualizado');
  });
});
