const newBlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, handleCreate, handleNewBlog }) => {
  return(
    <>
      <h2>Create new</h2>
      <div>
        title:<input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:<input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:<input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button onClick={handleCreate}>create</button>
      <button onClick={handleNewBlog}>cancel</button>
    </>
  )
}

export default newBlogForm