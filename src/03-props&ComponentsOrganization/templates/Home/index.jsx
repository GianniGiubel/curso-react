import './styles.css';

import { Component } from 'react';
import { render } from '@testing-library/react';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utilits/loadPosts';
import { Button } from '../../components/Button';

export class Home extends Component {
  state = {    
    posts: [],
    allPosts: [],  
    page: 0,
    postsPerPage: 99,  
  }; 

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage), 
      allPosts: postsAndPhotos,
    });    
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts} = this.state;

    const nextPage = page + postsPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPost);

    this.setState({ posts, page: nextPage });
  }

  componentDidUpdate() {}

  componentWillUnmount() {}  

  render() {    
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePage = page + postsPerPage >= allPosts.length;

    return (
      <section className='container'>
        <Posts posts={posts}></Posts>
        <div className='button-container'>
          <Button
            disabled={noMorePage}
            text='Load More Posts'
            onClick={this.loadMorePosts}>
          </Button>
        </div>        
      </section>
    );
  }
}

// export default Home;
