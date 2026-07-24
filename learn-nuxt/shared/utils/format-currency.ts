export const formatCurrency = (value:number) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'PEN',
      }).format(value);
}