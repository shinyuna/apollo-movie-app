import React from "react"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import { Link } from "react-router-dom"
import styled from "styled-components"

const LIKE_MOVIE = gql`
  mutation likeMovie($id: Int!, $isLiked: Boolean!) {
    likeMovie(id: $id, isLiked: $isLiked) @client
  }
`

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 420px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  overflow: hidden;
`

const Poster = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`
const LikeButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 20px;
`

export default ({ id, bg, isLiked }) => {
  const [likeMovie] = useMutation(LIKE_MOVIE, { variables: { id: +id, isLiked } })

  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <LikeButton onClick={likeMovie}>{isLiked ? "Like" : "Unlike"}</LikeButton>
    </Container>
  )
}
