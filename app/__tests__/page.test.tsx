import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Home from 'page';

describe('page test', () => {
  test('should render login container', () => {
    const { container } = render(<MockedProvider><Home /></MockedProvider>);
    expect(container.getElementsByTagName('a'));
  });

  test('matches snapshot', () => {
    const tree = renderer.create(<MockedProvider><Home /></MockedProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
