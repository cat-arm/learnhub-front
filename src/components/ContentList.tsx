import { Link } from 'react-router-dom'
import useContentList from '../hooks/useContentList'
import { useAuth } from '../providers/AuthProvider'
import ContentCard from './ContentCard'
import Loading from './Loading'

const ContentList = () => {
  const { isLoggedIn } = useAuth()
  const { contentList, isLoading, error } = useContentList()

  if (isLoading) return <Loading />

  if (error || !contentList) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="flex flex-col items-end mx-32 my-9">
      {isLoggedIn && (
        <Link to={'/create'} className="bg-orange-500 p-3 rounded-lg text-white hover:bg-orange-600 text-lg">
          Create New Content
        </Link>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch justify-stretch my-9 h-auto">
        {contentList.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  )
}

export default ContentList
