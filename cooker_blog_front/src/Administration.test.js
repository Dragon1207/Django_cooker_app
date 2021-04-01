import { render, screen } from '@testing-library/react';
import App from './App';
import CreateBlog from "./pages/admininistration/CreateBlog";

test("submit", async () => {
  const handleSubmit = jest.fn();
  render(<CreateBlog />);
  fireEvent.submit(screen.getByText("form"));
  expect(onSubmit).toHaveBeenCalled();
});
