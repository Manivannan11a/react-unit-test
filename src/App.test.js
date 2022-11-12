// import { render, screen } from '@testing-library/react';

import { shallow } from "enzyme";
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('renders without crashing', () => {
  expect(shallow(<App />)).toMatchSnapshot();
});