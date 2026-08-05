import { join } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const fileUpload = async (fileBuffer: Buffer, originalFilename: string) => {
  try {
    const fileExtension = originalFilename.split('.').pop() || 'png';
    const uuidFileName = `${uuidv4()}.${fileExtension}`;

    // -- INSTRUCCIONES PARA MIGRAR A UN SERVICIO EXTERNO (ej. VPS, S3, Cloudinary) --
    // 1. En lugar de guardar el archivo en el sistema de archivos local, utilizarás el SDK de tu proveedor.
    // 2. Por ejemplo, para Cloudinary, importarías 'cloudinary' e invocarías `cloudinary.uploader.upload_stream` (ver nuxt-mi-sitio-web-fin-seccion-09/shared/utils/file-upload.ts).
    // 3. Pasarías el `fileBuffer` al stream de subida del proveedor.
    // 4. Retornarías la URL pública que te devuelve el proveedor.
    // 5. Eliminarías las líneas de código a continuación que interactúan con `fs/promises`.
    // ----------------------------------------------------------------------------------

    // IMPLEMENTACIÓN LOCAL:
    // Guardaremos los archivos en la carpeta public/uploads para que sean accesibles estáticamente
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    // Crear el directorio si no existe
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = join(uploadDir, uuidFileName);
    await writeFile(filePath, fileBuffer);

    // Retornamos la URL pública para acceder al archivo subido
    return `/uploads/${uuidFileName}`;
  } catch (error) {
    console.error({ error });
    throw new Error('Error al cargar el archivo');
  }
};
