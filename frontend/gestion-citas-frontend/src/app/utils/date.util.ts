export function formatDateTime(fechaIso?: string): string {
  if (!fechaIso) return '';
  const d = new Date(fechaIso);
  if (isNaN(d.getTime())) return fechaIso;

  const formatter = new Intl.DateTimeFormat('es-CO', {
    timeZone: 'America/Bogota',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const parts = formatter.formatToParts(d);
  const values = parts.reduce<Record<string, string>>((acc, part) => {
    if (part.type !== 'literal') {
      acc[part.type] = part.value;
    }
    return acc;
  }, {});

  const day = values['day'] ?? '';
  const month = values['month'] ?? '';
  const year = values['year'] ?? '';
  const hour = values['hour'] ?? '';
  const minute = values['minute'] ?? '';
  const dayPeriod = values['dayPeriod'] ?? '';

  if (!day || !month || !year || !hour || !minute || !dayPeriod) {
    return formatter.format(d);
  }

  const normalizedPeriod = dayPeriod.replace(/\s+/g, ' ').toLowerCase();

  return `${day}/${month}/${year} - ${hour}:${minute} ${normalizedPeriod}`;
}

export function formatDateOnly(fechaIso?: string): string {
  if (!fechaIso) return '';
  const d = new Date(fechaIso);
  if (isNaN(d.getTime())) return fechaIso;

  return new Intl.DateTimeFormat('es-CO', {
    timeZone: 'America/Bogota',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(d);
}
