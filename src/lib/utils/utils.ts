export function slugify(str: string) {
  str = str.toLowerCase(); // Convert to lowercase
  str = str.trim(); // Remove leading/trailing whitespace

  // Normalize Unicode characters (e.g., remove accents)
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Replace non-alphanumeric characters (except hyphens and spaces) with spaces
  str = str.replace(/[^a-z0-9\s-]/g, ' ');

  // Replace multiple spaces with a single hyphen
  str = str.replace(/\s+/g, '-');

  // Replace multiple hyphens with a single hyphen
  str = str.replace(/-+/g, '-');

  // Remove leading and trailing hyphens
  str = str.replace(/^-+|-+$/g, '');

  return str;
}
