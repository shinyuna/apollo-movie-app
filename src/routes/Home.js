import React from "react"
import styled from "styled-components"
import Movie from "../components/Movie"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"

const GET_MOVIES = gql`
  {
    movies(rating: 9.9) {
      id
      title
      medium_cover_image
      isLiked @client
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`

const Subtitle = styled.h3`
  font-size: 35px;
`

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`

export default () => {
  const { loading, data } = useQuery(GET_MOVIES)
  console.log("🚀 ~ data", data)
  return (
    <Container>
      <Header>
        <Title>Apollo Movie App</Title>
        <Subtitle>GraphQL project</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <Movies>
        {data?.movies?.map((movie) => (
          <Movie
            id={movie.id}
            bg={movie.medium_cover_image}
            isLiked={movie.isLiked}
            key={movie.id}
          />
        ))}
      </Movies>
    </Container>
  )
}
