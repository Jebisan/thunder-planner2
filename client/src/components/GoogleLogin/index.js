import React, { Component } from 'react';
import Blog from '../../containers/Blog/Blog'
import './index.css';

//Assets
//import google from './google.png'
import config from '../config';

class GoogleLogin extends Component{
    constructor(props) {
        super(props)
        this.state = {
            googleName: undefined,
            showBlog: false
            };
        }
    
    
    componentDidMount(){
        (function() {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })();    
    }
    
    //Triggering login for google
    googleLogin = () => {
       //let response = null;
        window.gapi.auth.signIn({
            callback: function(authResponse) {
                this.googleSignInCallback( authResponse )
            }.bind( this ),
            clientid: config.google, //Google client Id
            cookiepolicy: "single_host_origin",
            requestvisibleactions: "http://schema.org/AddAction",
            scope: "https://www.googleapis.com/auth/plus.login email"
        });
    }
    
    googleSignInCallback = (e) => {
        console.log( e )
        if (e["status"]["signed_in"]) {
            window.gapi.client.load("plus", "v1", function() {
                if (e["access_token"]) {
                    this.getUserGoogleProfile( e["access_token"] )
                } else if (e["error"]) {
                    console.log('Import error', 'Error occured while importing data')
                }
            }.bind(this));
        } else {
            console.log('Oops... Error occured while importing data')
        }
    }

    getUserGoogleProfile = accesstoken => {
        var e = window.gapi.client.plus.people.get({
            userId: "me"
        });
        e.execute(function(e) {
            if (e.error) {
                console.log(e.message);
                console.log('Import error - Error occured while importing data')
                return
            
            } else if (e.id) {
                this.setState({googleName: e.displayName});
                
                return;
            }
        }.bind(this));
    }
    
    render(){



        return( 
            <div>
                {!this.state.googleName ?
                  <div> 
                    <button className='btn-danger' onClick={ () => this.googleLogin() }>Login with Google</button>
                </div> : null
                 } 
                   <Blog googleName={this.state.googleName} />   
                   
            </div>
        
        )
    }
}

export default GoogleLogin;