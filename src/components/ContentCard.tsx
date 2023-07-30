import { Link } from 'react-router-dom'
import { ContentDto } from '../types/types'

interface ContentCardProps {
  content: ContentDto
}

const ContentCard = ({ content }: ContentCardProps) => {
  return (
    <Link to={`/content/${content.id}`} className="flex flex-col bg-gray-100 rounded-xl shadow-lg overflow-hidden">
      <img src={content.thumbnailUrl} className="w-full aspect-video object-cover" />
      <div className="flex flex-col gap-4 p-4 justify-between h-full">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-md text-gray-500">{content.videoTitle}</p>
          <p className="text-gray-500">{content.creatorName}</p>
          <p className="text-gray-500 italic">{content.comment}</p>
        </div>
        <p className="text-md text-gray-500">{content.postedBy.name}</p>
      </div>
    </Link>
  )
}

export default ContentCard
