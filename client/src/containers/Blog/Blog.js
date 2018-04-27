import React, { Component } from 'react';
import axios from "axios";
import Post from '../../components/Post/Post';
import './Blog.css';

class Blog extends Component {
    constructor(props){
        super()
    }
    state = {
        googleName: undefined,
        dates:[],
        selectedPostId: null,
        googleLoginExist: false,
        loggedIn: true
    }

    componentDidMount(){ 
        if(this.props.googleName){
        let user = this.props.googleName.replace(/\s+/g, '');
        axios.get('http://my-json-server.typicode.com/Jebisan/db/'+user).then(response => {
        this.setState({dates: response.data});
        this.setState({loggedIn:false})
        console.log(this.state.dates);
        })
    }
    }

     

    postSelectedHandler =(id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        if(this.props.googleName&&this.state.loggedIn){
         this.componentDidMount();
        }

        const dates = this.state.dates.map( post => {
            return <Post
            key={post.id} 
            date={post.date}
            onJob = {post.onJob}
            available = {post.available}
            clicked={()=> this.postSelectedHandler(post.id)}
            id ={this.state.selectedPostId}
            />;
        }
    );
        return (
            <div>
                <section className="Posts">
                  {dates} 
                </section>
                <section>
                </section>
                <section>
                </section>
            </div>
        );
    
    }
}

export default Blog;