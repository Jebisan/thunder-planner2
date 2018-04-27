import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './NewPost.css';
import axios from 'axios';

class NewPost extends Component {
    constructor(props){
    super()
    this.handleChange = this.handleChange.bind(this);
    this.state = {
        startDate: moment(),
        cars: [],
        employees: []
        };
        
    }

       componentDidMount(){ 
        axios.get('http://api.thunder-power.dk/users').then(response => {
        this.setState({employees: response.data});
       // console.log('Employees found:',this.state.employees);
        })
        axios.get('https://thunder-planner.firebaseio.com/cars.json').then(response => {
            this.setState({cars: response.data});
            })
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
      }



    render () {
        return (
            <div className="NewPost">
                <h1>Create New Job</h1>
                <form action="">
                <input type="number" placeholder='ID'/>
                </form>
                <DatePicker
                 selected={this.state.startDate}
                 onChange={this.handleChange}/>
              <select>
              <option disabled defaultValue='Vælg DJ' >Vælg DJ</option>
              {this.state.employees.length > 0? this.state.employees.map(employee => (<option key= {employee.Nr}>{employee.Navn}</option>)) : "No Cars"}
             </select>


         <select>
         <option disabled defaultValue='Vælg Bil' >Vælg Bil</option>
         {this.state.cars.length > 0? this.state.cars.map(car => (<option key= {car}>{car}</option>)) : "No Cars"}
        </select>
    <button>Opret Job</button>
         
            </div>
        );
    }
}

export default NewPost;