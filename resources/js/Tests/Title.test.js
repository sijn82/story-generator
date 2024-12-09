import Title from "../Components/Title";
import { render, screen } from "@testing-library/react";

test('that component renders', () => {
    
    render(<Title title="A title" />)
    const titleElement = screen.getByText(/A title/i);
    expect(titleElement).toBeInTheDocument();
});

