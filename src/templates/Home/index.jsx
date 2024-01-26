import './styles.css';

import { Component } from 'react';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utilits/loadPosts';
import { Button } from '../../components/Button';
import { InputSearch } from '../../components/InputSearch';

export class Home extends Component {
  state = {    
    posts: [],
    allPosts: [],  
    page: 0,
    postsPerPage: 10,  
    searchValue: '',
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

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({searchValue: value});
  }

  componentDidUpdate() {}

  componentWillUnmount() {}  

  render() {    
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) 
    : posts;

    return (
      <section className='container'>
        <div className="input-container">
          {!!searchValue && (          
            <h1>Search Value: {searchValue}</h1>          
          )}
               
          <InputSearch
            searchValue={searchValue}
            handleChange={this.handleChange}
          ></InputSearch>
        </div>        

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}></Posts>
        )}

        {filteredPosts.length === 0 && (
          <h1>Não foi encontrado nenhum Post</h1>
        )}

        <div className='button-container'>
          {!searchValue && (
            <Button
              disabled={noMorePosts}
              text='Load More Posts'
              onClick={this.loadMorePosts}>
            </Button>
          )}
        </div>  

      </section>
    );
  }
}

// export default Home;
