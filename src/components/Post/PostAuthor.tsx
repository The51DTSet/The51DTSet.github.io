import React, { FunctionComponent } from 'react'
import authorsData from '../../data/authors.json'

type AuthorType = {
  id: string
  name: string
  bio: string
  homepage: string
  photo: string
}

const authors = authorsData as AuthorType[]

type PostAuthorProps = {
  authorIds: string[]
}

const PostAuthor: FunctionComponent<PostAuthorProps> = ({ authorIds }) => {
  const matched = authorIds
    .map(id => authors.find(a => a.id === id))
    .filter((a): a is AuthorType => a !== undefined)

  if (!matched.length) return null

  return (
    <div className="post-authors">
      {matched.map(author => (
        <div key={author.id} className="post-author">
          {author.photo && (
            <img
              src={author.photo}
              alt={author.name}
              className="post-author-photo"
            />
          )}
          <div className="post-author-info">
            <span className="post-author-name">{author.name}</span>
            {author.bio && <p className="post-author-bio">{author.bio}</p>}
            {author.homepage && (
              <a
                href={author.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="post-author-link"
              >
                {author.homepage}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostAuthor
