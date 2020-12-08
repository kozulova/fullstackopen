const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs)=>{
    return blogs.reduce((sum, item)=>{ return sum + item.likes}, 0)
} 

const favouriteBlog = (blogs)=>{
    const maxLikes =  blogs.reduce((max, item)=>{ 
        return Math.max(max, item.likes)
    }, 0)
    const favBlog = blogs.find(blog=>blog.likes === maxLikes)

    return {
        title: favBlog.title,
        author: favBlog.author,
        likes:favBlog.likes
    }
}
  
  module.exports = {
    dummy, totalLikes, favouriteBlog
  }