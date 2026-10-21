export type ContactFields = {
  company: string;
  business: string;
  region: string;
  name: string;
  phone: string;
  email: string;
  message: string;
};

export function validateContact(fields: ContactFields): Partial<Record<keyof ContactFields, string>> {
  const errors: Partial<Record<keyof ContactFields, string>> = {};
  for (const field of ['company', 'name', 'phone', 'email', 'message'] as const) {
    if (!fields[field].trim()) errors[field] = 'Mohon lengkapi kolom ini.';
  }
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Masukkan alamat email yang valid.';
  if (fields.phone && !/^\+?[\d\s().-]{7,25}$/.test(fields.phone)) errors.phone = 'Masukkan nomor telepon yang valid.';
  if (fields.message.length > 3000) errors.message = 'Pesan maksimal 3000 karakter.';
  return errors;
}

export function createMailto(fields: ContactFields) {
  const body = `Perusahaan/Institusi: ${fields.company.trim()}\nJenis institusi: ${fields.business.trim()}\nWilayah: ${fields.region.trim()}\nNama: ${fields.name.trim()}\nTelepon: ${fields.phone.trim()}\nEmail: ${fields.email.trim()}\n\n${fields.message.trim()}`;
  const subject=('Konsultasi kebutuhan peralatan - '+fields.company.trim()).replace(/[\r\n]+/g,' ');
  return `mailto:info@toc.co.id?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
