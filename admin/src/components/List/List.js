import React, { Component } from "react";
import * as firebase from "firebase";
import DatePicker from "react-datepicker";
import moment from "moment";
import  "moment/locale/da";
import "react-datepicker/dist/react-datepicker.css";

class List extends Component {
  constructor(props) {
    super(props);

    moment.locale('da');

    this.state = {
      dates: [],
      selectedDate: moment()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddDate = this.handleAddDate.bind(this);

    const config = {
      apiKey: "AIzaSyCUzD9or8ClpTDxykYvG5W6y19HWg6iO_s",
      authDomain: "thunder-planner.firebaseapp.com",
      databaseURL: "https://thunder-planner.firebaseio.com",
      projectId: "thunder-planner",
      storageBucket: "thunder-planner.appspot.com"
    };
   firebase.initializeApp(config);
   this.getInitialData();
  }

  handleChange(date) {
    this.setState({
      selectedDate: date
    })
  }

  getInitialData() {
    const database = firebase.database();
    database.ref("dates").once("value").then(snapshot => {
      let retrievedDates = [];

        snapshot.forEach(childSnapshot => {
          retrievedDates.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
        });

        console.log(retrievedDates);

        this.setState((prevState) => {
          return { dates: retrievedDates }
        })
      });
  }

  handleAddDate = (e) => {  
    e.preventDefault();
    //Pushing to Database
    const database = firebase.database(),
      formattedDate = moment(this.state.selectedDate).format('dddd LL');
     database.ref("dates").push({
      date: formattedDate[0].toUpperCase() + formattedDate.substr(1)
    });


    this.setState((prevState) => {
      return {
        dates: (prevState.dates.concat({
          date: formattedDate,
          id: formattedDate
        }))
      };
    }) 
  }


testButton=()=>{
  console.log('Current state:', this.state.dates);
}

  render() {
    return (
      <div className="NewPost">
        <h1>Add a Date</h1>
        <form onSubmit={this.handleAddDate}>
          <DatePicker
            inline
            selected={this.state.selectedDate}
            onChange={this.handleChange}
            minDate={moment()}
            monthsShown={3}
          />
          <button>Add Date</button>
        </form>
          <button onClick={this.testButton}>Test button</button>
          <Dates
            dates={this.state.dates}
          />
      </div>
    );
  }
}

class Dates extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.dates.map((date) => 
            <Date 
              key={date.id} 
              dateText={date.date} 
            />
          )
        }
      </div>
    );
  }
}

class Date extends React.Component {
  render() {
    return (
      
       <p> {this.props.dateText}</p>
      
    );
  }
}

export default List;