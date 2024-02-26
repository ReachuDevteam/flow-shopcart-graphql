import { gql } from '@apollo/client';
import client from '../client';

export async function fetchExampleQuery() {
  const EXAMPLE_QUERY = gql`
    query ExampleQuery {
      exampleQuery {
        id
        value
      }
    }
  `;
  const { data } = await client.query({ query: EXAMPLE_QUERY });
  return data;
}
