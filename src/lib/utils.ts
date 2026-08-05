export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, maxLength = 150): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function buildCloudinaryUrl(
  publicId: string,
  transforms: string = 'f_auto,q_auto,w_800'
): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  return `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${publicId}`
}

export function getOptimizedImageUrl(url: string, width = 800): string {
  if (!url || !url.includes('res.cloudinary.com')) return url
  // Avoid duplicating transforms if already present
  if (url.includes('/f_auto,q_auto,')) return url
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`)
}
