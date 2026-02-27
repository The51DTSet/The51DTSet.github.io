import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PostFrontmatterType } from 'types/PostItem.types'
import { Link } from 'gatsby'

type PostItemProps = PostFrontmatterType & { link: string }

const PostItemWrapper = styled(Link)`
  flex: 0 0 auto;
  width: calc(50% - 1rem);
  display: flex;
  flex-direction: column;
  border-radius: 1.6rem;
  // box-shadow: 0 8px 25px 0 rgba(0, 0, 0, 0.15);
  transition: 0.3s box-shadow;
  cursor: pointer;
  background: var(--bg-sub);

  &:hover {
    // width: 100%;
  }
`

const ThumbnailImage = styled(GatsbyImage)`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px 10px 0 0;
`

const PostItemContent = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.6rem;
  }
`

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  white-space: normal;
  overflow-wrap: break-word;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Date = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: #717171;
  margin-top: 2rem;
`

const Category = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 2rem;
`

const CategoryItem = styled.span`
  font-size: 1.2rem;
  color: var(--fc-primary);
  font-weight: 500;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  background: #fff;
`

const Summary = styled.div`
  font-size: 1.4rem;
  display: -webkit-box;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  color: #555;
  margin-top: 1rem;
  overflow: hidden;
`

const PostItem: FunctionComponent<PostItemProps> = function ({
  title,
  date,
  categories,
  summary,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  link,
}) {
  return (
    <PostItemWrapper to={link}>
      <ThumbnailImage image={gatsbyImageData} alt="Post Item Image" />

      <PostItemContent>
        <Title>{title}</Title>
        <Summary>{summary}</Summary>
        <Date>{date}</Date>
        <Category>
          {categories.map(category => (
            <CategoryItem key={category}>#{category}</CategoryItem>
          ))}
        </Category>
      </PostItemContent>
    </PostItemWrapper>
  )
}

export default PostItem
