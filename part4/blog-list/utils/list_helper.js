const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, { likes }) => {
    return sum + likes
  }, 0)

  return total
}

module.exports = {
  totalLikes
}
