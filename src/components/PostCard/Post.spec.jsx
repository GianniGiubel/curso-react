import { PostCard } from '.';
import { render, screen } from '@testing-library/react';
import { PostCardPropsMock } from './mock';

const props = PostCardPropsMock;

describe('<PostCard/>', () => {
  it('should render PostCard on the document', () => {
    // const {debug} = render(<PostCard {...props} ></PostCard>);
    // debug();

    render(<PostCard {...props} ></PostCard>);

    expect(screen.getByRole('img', {name: /title 1/i }))
    .toHaveAttribute('src', 'img/img.png');
    expect(screen.getByRole('heading', {name: /title 1/i }))
    .toBeInTheDocument();
    expect(screen.getByText('body 1')).toBeInTheDocument();
    
  });

  it('should match snapshot', () => {
    const {container} = render(<PostCard {...props}></PostCard>);
    expect(container.firstChild).toMatchSnapshot();
  });
});