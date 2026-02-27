import React, { FunctionComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

export type CategoryListProps = {
  selectedCategory: string
  categoryList: {
    // 프로퍼티 이름은 문자열, 프로퍼티 값은 숫자임을 나타내는 타입 표기 방법
    [key: string]: number
  }
}

type CategoryItemProps = {
  active: boolean
}

type GatsbyLinkProps = {
  children: ReactNode
  className?: string
  to: string
} & CategoryItemProps

const CategoryListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem 2rem;
  width: 768px;
  margin: 5rem auto 0;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 2rem;
    padding: 0 2rem;
  }
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => (
  <Link {...props} />
))<CategoryItemProps>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.6rem;
  letter-spacing: 0;
  color: ${({ active }) =>
    active ? 'var(--fc-primary)' : 'var(--fc-default)'};
  font-weight: ${({ active }) => (active ? '800' : '400')};
  padding: 0.4rem 0;
  cursor: pointer;

  @media (max-width: 768px) {
  }
`
const CountItem = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--fc-sub2);
`

// active : 현재 선택된 카테고리인지 확인하기 위한 Props
// children : 컴포넌트 내부의 요소들
// className : Styled Component를 통해 정의한 스타일을 적용하기 위한 클래스명
// to : Link 컴포넌트에 전달하기 위한 경로

const CategoryList: FunctionComponent<CategoryListProps> = function ({
  selectedCategory,
  categoryList,
}) {
  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryItem
          to={`/?category=${name}`}
          active={name === selectedCategory}
          key={name}
        >
          #{name} <CountItem>{count}</CountItem>
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  )
}

export default CategoryList
