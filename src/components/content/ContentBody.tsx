interface Block {
  type: string
  content: string
}

interface ContentBodyProps {
  blocks: Block[]
}

export default function ContentBody({ blocks }: ContentBodyProps) {
  return (
    <div className="content-body">
      {blocks?.map((block, i) => {
        if (block.type === 'text') {
          return (
            <div
              key={i}
              className="content-text"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          )
        }
        return null
      })}
    </div>
  )
}
