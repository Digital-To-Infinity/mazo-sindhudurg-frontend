import Image from 'next/image'

interface MediaImageProps {
  src?: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

export default function MediaImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
}: MediaImageProps) {
  const imgSrc = src || '/placeholder.webp'
  const isCloudinary = imgSrc.includes('cloudinary.com')

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ objectFit: 'cover' }}
      quality={isCloudinary ? 80 : undefined}
    />
  )
}
