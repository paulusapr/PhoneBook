import { Suspense } from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Home from 'page';
import { CONTACT_QUERY } from "services/persons";

const mocks = [
  {
    request: {
      query: CONTACT_QUERY,
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
    const { container } = render(<MockedProvider mocks={mocks} addTypename={false}><Home /></MockedProvider>);
    expect(container.getElementsByTagName('a'));
  });

  test('matches snapshot', () => {
    const tree = renderer.create(<MockedProvider mocks={mocks} addTypename={false}><Suspense fallback={`Loading...`}><Home /></Suspense></MockedProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
