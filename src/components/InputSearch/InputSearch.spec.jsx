import { render,screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputSearch } from '.';

describe('<InputSearch/>',() => {
  it('should have a value on searchValue', () => {
    const fn = jest.fn();
    render(<InputSearch handleChange = {fn} searchValue={'Testando'}></InputSearch>);
    
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();

    expect(input.value).toBe('Testando');
  }); 

  it('should call HandleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<InputSearch handleChange = {fn}></InputSearch>);
    
    const input = screen.getByPlaceholderText(/search/i);
    const value = 'o valor';

    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  }); 

  it('should match snapshot', () => {
    const fn = jest.fn();
    const {container} = render(<InputSearch handleChange = {fn}></InputSearch>); 

    expect(container.firstChild).toMatchSnapshot();
  });  
});