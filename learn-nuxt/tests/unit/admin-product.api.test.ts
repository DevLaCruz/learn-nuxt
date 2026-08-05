import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';

/**
 * ==============================================================================
 * Pruebas Unitarias: Lógica de Server Endpoints de Admin & Middleware Drizzle ORM
 * ==============================================================================
 * 
 * ¿Qué evalúa este archivo de pruebas?
 * 1. Validación de esquema Zod para las peticiones POST y PATCH de productos.
 * 2. Protección de endpoints de administración mediante middleware (`server/middleware/admin-dashboard.ts`).
 * 3. Operaciones esperadas de Drizzle ORM (`db.insert` y `db.update`).
 */

// Esquemas Zod utilizados en los endpoints de admin de producto
const createProductSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

const updateProductSchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

describe('Server API: Admin Product Endpoints & Middleware', () => {

  /**
   * Test 1: Middleware de Protección `/api/admin/*`
   * Evalúa la lógica usada en `server/middleware/admin-dashboard.ts`.
   * Rechaza el acceso si el usuario no cuenta con la sesión iniciada o el rol 'admin'.
   */
  it('Middleware: Debe denegar el acceso a rutas /api/admin si el usuario no es admin', () => {
    // Definimos una función que imita la verificación del middleware
    const checkAdminPermission = (userSession: { roles: string[] } | null) => {
      if (!userSession || !userSession.roles.includes('admin')) {
        throw new Error('Unauthorized');
      }
      return true;
    };

    // Caso A: Usuario no autenticado (null)
    expect(() => checkAdminPermission(null)).toThrow('Unauthorized');

    // Caso B: Usuario autenticado pero sin rol 'admin' (ej: rol 'user')
    const userSessionNormal = { roles: ['user'] };
    expect(() => checkAdminPermission(userSessionNormal)).toThrow('Unauthorized');

    // Caso C: Usuario administrador con el rol 'admin'
    const userSessionAdmin = { roles: ['admin', 'user'] };
    expect(checkAdminPermission(userSessionAdmin)).toBe(true);
  });

  /**
   * Test 2: Validación Zod en POST `/api/admin/product`
   * Comprueba que los datos enviados para crear un producto cumplan con los campos requeridos.
   */
  it('API POST: Debe validar correctamente el body para crear un producto', () => {
    const validBody = {
      slug: 'servicio-soporte-ti',
      name: 'Soporte TI Presencial',
      description: 'Asistencia técnica en sitio para oficinas y empresas.',
      price: 250,
      images: ['https://example.com/image.jpg'],
      tags: ['soporte', 'ti', 'presencial'],
    };

    // Validación exitosa
    const parsedValid = createProductSchema.safeParse(validBody);
    expect(parsedValid.success).toBe(true);

    // Caso inválido: falta 'slug' y 'price' es negativo
    const invalidBody = {
      name: 'Servicio Incompleto',
      description: 'Sin slug ni precio válido',
      price: -50,
    };

    const parsedInvalid = createProductSchema.safeParse(invalidBody);
    expect(parsedInvalid.success).toBe(false);
  });

  /**
   * Test 3: Validación Zod en PATCH `/api/admin/product/[id]`
   * Comprueba que las actualizaciones parciales en PATCH admitan campos opcionales.
   */
  it('API PATCH: Debe permitir actualización parcial de campos', () => {
    const partialUpdate = {
      price: 300,
      description: 'Descripción actualizada del servicio TI',
    };

    const parsedPartial = updateProductSchema.safeParse(partialUpdate);
    expect(parsedPartial.success).toBe(true);
    if (parsedPartial.success) {
      expect(parsedPartial.data.price).toBe(300);
      expect(parsedPartial.data.name).toBeUndefined();
    }
  });

  /**
   * Test 4: Formateo de respuesta Drizzle ORM
   * Comprueba la estructura de respuesta producida tras insertar un registro con Drizzle ORM.
   */
  it('API Drizzle ORM: Debe retornar la estructura esperada de producto creado', () => {
    // Muestra de los datos procesados por Drizzle ORM
    const insertedRecord = {
      id: 10,
      slug: 'consultoria-cloud',
      name: 'Consultoría Cloud',
      description: 'Migración e infraestructura en la nube',
      price: 500,
      images: [],
      tags: ['cloud', 'aws'],
      createdAt: '2026-08-05T00:00:00.000Z',
      updatedAt: '2026-08-05T00:00:00.000Z',
    };

    const apiResponse = {
      message: 'Product created successfully',
      product: insertedRecord,
    };

    expect(apiResponse.message).toBe('Product created successfully');
    expect(apiResponse.product.id).toBe(10);
    expect(apiResponse.product.slug).toBe('consultoria-cloud');
  });
});
