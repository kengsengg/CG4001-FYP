import React, { Component } from 'react';
import {HEALTHCARE_RECORD_ABI, HEALTHCARE_RECORD_ADDRESS} from './config';
import { Upload } from "./Upload";
import { Files } from "./Files";
import Form from 'react-bootstrap/Form';
import './App.css';


class Doctor extends Component {
  async componentWillMount() {
    await this.loadData()
  }

  async loadData() {
    const web3 = window.web3
    const healthcareRecord = new web3.eth.Contract(HEALTHCARE_RECORD_ABI, HEALTHCARE_RECORD_ADDRESS)
    this.setState({ healthcareRecord} )
    const patientCount = await healthcareRecord.methods.patientCount().call()
    this.setState({ patientCount })
    for (var i = 1; i <= patientCount; i++) {
      const patient = await healthcareRecord.methods.patients(i).call()
      this.setState({
        patients: [...this.state.patients, patient]
      })
    }
  }

  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.state = {
        patients: [],
        selectedName: "",
    };
  }

  select(event) {
    this.setState({ selectedName: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>Doctor View</h1>
        <p>&nbsp;</p>
        <h2><font color="turqoise">Add Medical Record</font></h2>
        
        <Form>
          <Form.Label>
            Select Patient: 
            <Form.Control as="select" value={this.state.name} onChange={this.select} className="dropdown-list" >
              { this.state.patients.map((patient, key) => {
              return( 
                <option eventKey={key} value={patient.name}>{patient.name}</option>
              )
            })}
            </Form.Control>
          </Form.Label>
        </Form>

        <p>Selected Patient: {this.state.selectedName}</p>
        <Upload callbackFromDoctor={this.myCallback} />
        <p>&nbsp;</p>
        <h2><font color="turqoise">Record List</font></h2>
        <Files />
      </div>
    );
  }
}

export default Doctor;