import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {HEALTHCARE_RECORD_ABI, HEALTHCARE_RECORD_ADDRESS} from './config';
import { Files } from "./Files";

class Patient extends Component {
  async componentWillMount() {
    await this.loadData()
  }

  async loadData() {
    const web3 = window.web3
    const healthcareRecord = new web3.eth.Contract(HEALTHCARE_RECORD_ABI, HEALTHCARE_RECORD_ADDRESS)
    this.setState({ healthcareRecord })
    const patient = await healthcareRecord.methods.viewPatient(this.props.account).call()
    this.setState({ id: patient[0] })
    this.setState({ name: patient[1] })
    this.setState({ dob: patient[2] })
    this.setState({ gender: patient[3] })
    this.setState({ contactnumber: patient[4] })
    this.setState({ residentialaddress: patient[5] })
    this.setState({ bcaddress: patient[6] })
  }

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      dob: "",
      gender: "",
      contactnumber: "",
      residentialaddress: "",
      bcaddress: "",
     
  };
  }
  
  render() {
    return (
      <div>
        <h1>Patient View</h1>
        <p>&nbsp;</p>
        <h2><font color="turqoise">Personal Particulars</font></h2>
        <ListGroup>
          <ListGroup.Item><span className="patient">ID: {this.state.id.toString()}</span></ListGroup.Item>
          <ListGroup.Item><span className="patient">Name: {this.state.name}</span></ListGroup.Item>
          <ListGroup.Item><span className="patient">Date Of Birth: {this.state.dob}</span></ListGroup.Item>
          <ListGroup.Item><span className="patient">Gender: {this.state.gender}</span></ListGroup.Item>
          <ListGroup.Item><span className="patient">Contact Number: {this.state.contactnumber}</span></ListGroup.Item>
          <ListGroup.Item><span className="patient">Residential Address: {this.state.residentialaddress}</span></ListGroup.Item>
          <ListGroup.Item><span className="patient">Public Address: {this.state.bcaddress}</span></ListGroup.Item>
        </ListGroup>
        <p>&nbsp;</p>
        <h2><font color="turqoise">Record List</font></h2>
        <Files />
      </div>
    );
  }
}

export default Patient;
