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

const mostProlificAuthor = (blogs) => {
  if(blogs.length === 0) {
    return {}
  }
  
  let count = {}
  let mostProlific = blogs[0].author

  blogs.forEach(blog => {
    if(blog.author in count) {
      count[blog.author]++
    } else {
      count[blog.author] = 1
    }

    if(count[blog.author] > count[mostProlific]) {
      mostProlific = blog.author
    }
  })

  return { author: mostProlific, blogs: count[mostProlific] }
}

const mostLikedAuthor = (blogs) => {
  if(blogs.length === 0) {
    return {}
  }
  
  let count = {}
  let mostLiked = blogs[0].author

  blogs.forEach(blog => {
    if(blog.author in count) {
      count[blog.author] += blog.likes
    } else {
      count[blog.author] = blog.likes
    }

    if(count[blog.author] > count[mostLiked]) {
      mostLiked = blog.author
    }
  })

  return { author: mostLiked, likes: count[mostLiked] }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostProlificAuthor,
  mostLikedAuthor
}
