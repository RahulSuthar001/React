import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  newApi = "db31830fe5e749478de6bbd788eab5a1";
  oldApi = "db31830fe5e749478de6bbd788eab5a1";
  apiKey = this.newApi;
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log('i am constructor');
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    }
    document.title = `${this.capFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parseData.articles, totalResults: parseData.totalResults,
      loading: false,

    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }
  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews();
  }
  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,

    });
    console.log(this.state.articles.length );
    console.log(this.state.totalResults );
  };



  render() {
    return (
      <div className="container">
        <h2 className="text-center">
          NewsMoneky - Top  {this.capFirstLetter(this.props.category)} HeadLines
        </h2>
        {/* {this.state.loading && <Spinner />} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((e) => {
                return <div className="col-md-3" key={e.url}>
                  <NewsItem title={e.title ? e.title.slice(0, 45) : ''} description={e.description ? e.description.slice(0, 88) : ''} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name} />
                </div>
              })
              }
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between ">
          <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}
