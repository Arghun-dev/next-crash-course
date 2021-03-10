import { useRouter } from 'next/router'

const article = () => {
  const router = useRouter()
  const { id } = router

  return (
    <div>
      this is an article {id}
    </div>
  )
}

export default article;