import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import LogoImage from 'components/Main/LogoImage'

type IntroductionProps = {
  logoImage: IGatsbyImageData
}

const Background = styled.div`
  width: 100%;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 768px;
  padding: 5rem 0 1.6rem;
  white-space: nowrap;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.6rem 2rem;
  }
`
const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }
`
const Title = styled.div`
  font-size: 2.4rem;
  font-weight: 200;
  letter-spacing: 0;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`
const TitleStrong = styled.span`
  font-weight: 700;

  @media (max-width: 768px) {
  }
`
const SearchWrap = styled.div`
  font-size: 1.4rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Introduction: FunctionComponent<IntroductionProps> = function ({
  logoImage,
}) {
  return (
    <Background>
      <Wrapper>
        <TitleWrap>
          <LogoImage logoImage={logoImage} />
          <div>
            <Title>
              The51X DT <TitleStrong>Set Team Blog</TitleStrong>
            </Title>
          </div>
        </TitleWrap>
        <SearchWrap>Search</SearchWrap>
      </Wrapper>
    </Background>
  )
}

export default Introduction
