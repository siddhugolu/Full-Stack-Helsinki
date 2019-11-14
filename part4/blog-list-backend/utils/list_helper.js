const totalLikes = (blogs) => {
    return blogs.map(b => b.likes).reduce((acc, item) => acc+item, 0)
}

const favoriteBlog = (blogs) => {
    let maxLikes = {
        title: "",
        author: "",
        likes: null
    }
    if(!blogs.length) return null
    blogs.forEach(item => {
        if(item.likes > maxLikes.likes) {
            maxLikes = item
        }
    })
    return {
        title: maxLikes.title,
        author: maxLikes.author,
        likes: maxLikes.likes
    }
}

const mostBlogs = (blogs) => {
    const blogsMap = new Map()
    blogs.forEach(item => {
        if(blogsMap.has(item.author)) {
            let getBlogs = blogsMap.get(item.author)
            getBlogs++
            blogsMap.set(item.author, getBlogs)
        } else {
            blogsMap.set(item.author, 1)
        }
    })

    let result = {
        author: "",
        blogs: null
    }
    if(!blogs.length) return null
    let count = 0
    blogsMap.forEach((value, key) => {

        if(value > count) {
            count = value
            result = {
                author: key,
                blogs: value
            }
        }
    })

    return result
}

const mostLikes = (blogs) => {
    const blogsMap = new Map()
    blogs.forEach(item => {
        if(!blogsMap.has(item.author)) {
            blogsMap.set(item.author, item.likes)
        } else {
            let getLikes = blogsMap.get(item.author)
            getLikes += item.likes
            blogsMap.set(item.author, getLikes)
        }
    })

    let result = {
        author: "",
        likes: null
    }

    if(!blogs.length) return null
    let count = 0
    blogsMap.forEach((value, key) => {
        if(value > count) {
            count = value
            result = {
                author: key,
                likes: value
            }
        }
    })

    return result
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}