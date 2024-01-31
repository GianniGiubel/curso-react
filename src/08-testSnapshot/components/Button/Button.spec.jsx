import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '.';
import userEvent from '@testing-library/user-event';

describe('<Button/>', () => {
  it('should render the button with a text "Load More"', () => {
    render(<Button text="Load More"></Button>);
    expect.assertions(1);

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();    
  });

  it('should call a function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Load More" onClick={fn}></Button>);    

    const button = screen.getByRole('button', { name: /load more/i });

    userEvent.click(button);
    // fireEvent.click(button);
    
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    render(<Button text="Load More" disabled={true}></Button>);    

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeDisabled();    
  });

  it('should be enabled when disabled is false', () => {
    render(<Button text="Load More" disabled={false}></Button>);    

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeEnabled();   
  });

});