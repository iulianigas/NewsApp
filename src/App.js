import React from "react";
import { getArticles } from "./api";
import ArticleList from "./ArticleList";
import SearchBar from "./searchBar";
import SearchPagination from "./searchPagination";
import { Container, Header } from "semantic-ui-react";

class App extends React.Component {
  state = {
    articles: [],
    searchTopic: "",
    totalResults: "",
    loading: false,
    apiError: ""
  };

  searchForTopic = async topic => {
    try {
      this.setState({ loading: true });
      const response = await getArticles(topic);
      this.setState({
        articles: response.articles,
        searchTopic: topic,
        totalResults: response.totalResults
      });
    } catch (error) {
      this.setState({ apiError: "Could not find any articles" });
    }
    this.setState({ loading: false });
  };

  render() {
    const {
      articles,
      apiError,
      loading,
      searchTopic,
    } = this.state;
    return ( 
      <Container style={{backgroundColor: 'lightgray'}}>
        
        <Header as="h2" style={{ textAlign: "center", margin: 20 }}>
          Welcome to MyNews, a news application with updated and real-life news
        </Header>
        <SearchBar searchForTopic={this.searchForTopic} />
        {loading && (
          <p style={{ textAlign: "center" }}>Searching for articles...</p>
        )}
        {articles.length > 0 && (
          <Header as="h4" style={{ textAlign: "center", margin: 20 }}>
            Here you can find most recent news based on <b>"{searchTopic}"</b>
          </Header>
        )}
        {articles.length > 0 && <ArticleList articles={articles} />}
        {apiError && <p>Could not fetch any articles. Please try again.</p>}
        
         <SearchPagination/>  
        

      </Container>

    );
  }
}

export default App;