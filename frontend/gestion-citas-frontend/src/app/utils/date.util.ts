export function formatDateTime(fechaIso?: string): string {
  if (!fechaIso) return '';
  const d = new Date(fechaIso);
  if (isNaN(d.getTime())) return fechaIso;

  const pad = (n: number) => String(n).padStart(2, '0');

  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = pad(d.getMinutes());
  const isPm = hours >= 12;
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const ampm = isPm ? 'p. m.' : 'a. m.';
  const hourStr = pad(hour12);

  return `${day}/${month}/${year} - ${hourStr}:${minutes} ${ampm}`;
}
