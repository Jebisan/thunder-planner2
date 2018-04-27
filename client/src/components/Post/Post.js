import Toggle from 'react-toggle';
import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
    constructor(props){
        super()
    }
    state = {
    }


render() {
    return (
        <article className="Post" /*onClick={props.clicked}*/>
        <h1>{this.props.date}</h1>
        <label>
        <Toggle 
        defaultChecked={this.props.available} 
        disabled={this.props.onJob} />
        </label>
    </article>
    );
  }

}

export default Post;