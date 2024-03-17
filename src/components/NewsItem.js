import React, { Component } from "react";

export default class NewsItem extends Component {


    render() {
        let { title, description, imageUrl, newsUrl, author, date,source } = this.props;
        return (
            <div className=" h-100 pb-4">
                <div className="card  h-100">
                    <div style={{
                        display:'flex',
                        justifyontent:'flex-end',
                        position:'absolute',
                        right:0,
                    }}>
                    <span className="badge rounded-pill bg-danger" style={{left:'80%',zIndex:'1'}}>
                                {source}
                            
                            </span>
                    </div>
               
                    <img style={{ height: "200px" }} src={imageUrl ? imageUrl : "https://images.news18.com/ibnlive/uploads/2022/04/solar-flares-2-165034137016x9.png"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">
                            {description}
                          
                        </p>
                        <p className="card-text"> <small className="text-muted" > - By {author ? author : "Unknown"} on {new Date(date).toGMTString()}  </small></p>

                    </div>
                    <div className="card-footer text-center">
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">
                            Read More
            </a>
                    </div>
                </div>
            </div>
        );
    }
}
