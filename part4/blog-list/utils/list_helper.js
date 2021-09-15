const totalLikes = (blogs) => {
  return blogs.reduce((sum, { likes }) => {
    return sum + likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, current) => {
    return favorite.likes > current.likes ? favorite : current
  }, {})
}

module.exports = {
  totalLikes,
  favoriteBlog
}
