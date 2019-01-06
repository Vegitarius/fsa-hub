// eslint-disable
// this is an auto generated file. This will be overwritten
import gql from "graphql-tag"

export const getEvent = gql`query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    name
    where
    when
    description
    comments {
      items {
        eventId
        commentId
        content
        createdAt
      }
      nextToken
    }
  }
}
`;
export const listEvents = gql`query ListEvents(
  $filter: TableEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      where
      when
      description
      comments {
        nextToken
      }
    }
    nextToken
  }
}
`;
