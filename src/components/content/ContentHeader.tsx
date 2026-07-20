import MediaImage from '@/components/shared/MediaImage'

interface ContentHeaderProps {
  title: string
  subtitle?: string
  image?: string
}

export default function ContentHeader({ title, subtitle, image }: ContentHeaderProps) {
  return (
    <header className="content-header">
      {image && (
        <div className="content-hero-image">
          <MediaImage src={image} alt={title} width={1200} height={500} priority />
        </div>
      )}
      <div className="content-header-text">
        <h1>{title}</h1>
        {subtitle && <p className="content-subtitle">{subtitle}</p>}
      </div>
    </header>
  )
}
