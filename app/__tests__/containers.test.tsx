import { MockedProvider } from "@apollo/client/testing";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import HomeContainer from 'containers';
import { CONTACT_QUERY } from "services/persons";

const mocks = [
  {
    request: {
      query: CONTACT_QUERY,
      variables: {
        limit: 15, offset: 1, order_by: { created_at: 'desc' }
      }
    },
    result: {
      data: {
        contact: { created_at: '', first_name: '', id: 1, last_name: '', phones: ['', ''] }
      }
    }
  }
];

describe('page test', () => {
  test('should render login container', () => {
    const { container } = render(<MockedProvider mocks={mocks} addTypename={false}><HomeContainer /></MockedProvider>);
    expect(container.getElementsByTagName('button'));
  });

  test('matches snapshot', () => {
    const tree = renderer.create(<MockedProvider mocks={mocks} addTypename={false}><HomeContainer /></MockedProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
