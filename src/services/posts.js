import useApi from 'src/composables/useApi'

export default function postsServices () {
  const { list, post, update, remove, getById } = useApi('posts')

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
