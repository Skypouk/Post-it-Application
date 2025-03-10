import { gql } from "@apollo/client";


export const GET_NOTES = gql`
  query {
    getNotes {
      id
      title
      description
      position {
        x
        y
      }
      colors {
        colorName
        colorHeader
        colorBody
        colorText
      }
    }
  }
`;

export const GET_NOTE = gql`
  query GetNote($id: Int!) {
    getNote(id: $id) {
      id
      title
      description
      position {
        x
        y
      }
      colors {
        colorName
        colorHeader
        colorBody
        colorText
      }
    }
  }
`;


export const CREATE_NOTE = gql`
  mutation CreateNote(
    $position: String!
    $colors: String!
  ) {
    createNote(
      position: $position
      colors: $colors
    ) {
      id
      position {
        x
        y
      }
      colors {
        colorName
        colorHeader
        colorBody
        colorText
      }
    }
  }
`;


export const UPDATE_NOTE = gql`
  mutation UpdateNote(
    $id: Int!
    $description: String
    $position: String
    $colors: String
  ) {
    updateNote(
      id: $id
      description: $description
      position: $position
      colors: $colors
    ) {
      id
      title
      description
      position {
        x
        y
      }
      colors {
        colorName
        colorHeader
        colorBody
        colorText
      }
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: Int!) {
    deleteNote(id: $id)
  }
`;
