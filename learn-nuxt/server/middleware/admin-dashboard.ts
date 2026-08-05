// los middlewares se pueden ejecutar ya sea en orden alfabetico del archivo u ordenados con 1 numero en adelante

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api/admin')) {
    return;
  }

  const session = await requireUserSession(event);
  const hasAdminRole = session.user.roles.includes('admin');

  if (!hasAdminRole) {
    throw createError({
      statusCode: 401,
      message: `Unauthorized`,
    });
  }
});
