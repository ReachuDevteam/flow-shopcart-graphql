import { gql } from '@apollo/client';
import client from '../client';

export async function executeExampleMutation(variables: {
  input: { id: string; value: string };
}) {
  const EXAMPLE_MUTATION = gql`
    mutation ExampleMutation($input: DataInput!) {
      exampleMutation(input: $input) {
        id
        value
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: EXAMPLE_MUTATION,
    variables,
  });

  return data;
}
