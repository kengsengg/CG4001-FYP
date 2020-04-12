import React, { Component } from 'react';
import {HEALTHCARE_RECORD_ABI, HEALTHCARE_RECORD_ADDRESS} from './config';
import './App.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as Yup from 'yup';

class Admin extends Component {
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
    this.addPatient = this.addPatient.bind(this);
    this.searchPatient = this.searchPatient.bind(this);
    this.state = {
        patientCount: 0,
        patients: [],
        filteredPatients: [],
        name: "",
        dob: "",
        gender: "",
        contactnumber: "",
        residentialaddress: "",
        bcaddress: ""
    };
  }

  addPatient(event) {
    event.preventDefault();
    this.state.healthcareRecord.methods.addPatient(this.state.name, this.state.dob, this.state.gender,
      this.state.contactnumber, this.state.residentialaddress, this.state.bcaddress)
      .send({ from: this.props.account })
  }

  searchPatient(event) {
    event.preventDefault();
    const searchResult = event.target.value.toLowerCase(),
    filteredPatients = this.state.patients.filter((fp) => {
      let searchValue = fp.name.toLowerCase();
      return searchValue.indexOf(searchResult) !== -1;
    })
    this.setState({ filteredPatients: filteredPatients} )  
  }

  render() {
    const dobRegEx = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
    const contactNumberRegEx = /^[6|8|9][0-9]{7}$/
    const bcaddressRegEx = /^0x[0-9a-fA-F]{40}$/
    const validationRules = Yup.object().shape({
      name: Yup.string()
      .min(2, "* Name must be at least 2 characters")
      .required("* Please key in the name"),
      dob: Yup.string()
      .matches(dobRegEx, "* Date of birth is not valid")
      .required("* Please key in the date of birth"),
      contactnumber: Yup.string()
      .matches(contactNumberRegEx, "* Contact number is not valid")
      .required("* Please key in the contact number"),
      residentialaddress: Yup.string()
      .required("* Please key in the residential address"),
      bcaddress: Yup.string()
      .matches(bcaddressRegEx, "* Blockchain address is not valid")
      .required("* Please key in the blockchain address")
    })

    return (
      <div>
        <h1>Admin View</h1>
        <p>Patient Count: {this.state.patientCount.toString()}</p>
        
        <Row>
          <Col>
            <h2><font color="turqoise">Add Patient</font></h2>
            <Formik 
            initialValues={{ name:"", dob:"", contactnumber:"", residentialaddress:"", bcaddress:""}}
            validationSchema={validationRules}
            >
              {( {values, errors, touched, handleChange, handleBlur}) => (
              <>  
              <Form.Group controlId="formGroupName" className="pb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name"
                  placeholder="Enter Name"
                  onBlur={handleBlur}
                  value={values.name} 
                  onChange={event => {handleChange(event); this.setState({ name: event.target.value })}}
                  className={touched.name && errors.name ? "error" : null} 
                 />
                {touched.name && errors.name ? (<div className="error-message">{errors.name}</div>) : null}
              </Form.Group>
              <Form.Group controlId="formGroupDateOfBirth" className="pb-3">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control 
                  type="text"
                  name="dob" 
                  placeholder="Enter Date Of Birth (DD/MM/YYYY)"
                  onBlur={handleBlur}
                  value={values.dob}
                  onChange={event => {handleChange(event); this.setState({ dob: event.target.value })}} 
                  className={touched.dob && errors.dob ? "error" : null} 
                />
                {touched.dob && errors.dob ? (<div className="error-message">{errors.dob}</div>) : null}
              </Form.Group>
              <Form.Group controlId="formGroupGender" className="pb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control 
                  as="select" 
                  onChange={event => this.setState({ gender: event.target.value})}
                >
                  <option>Select Gender</option>  
                  <option>Female</option>
                  <option>Male</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formGroupContactNumber" className="pb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control 
                  type="text"
                  name="contactnumber" 
                  placeholder="Enter Contact Number" 
                  onBlur={handleBlur}
                  value={values.contactnumber}
                  onChange={event => {handleChange(event); this.setState({ contactnumber: event.target.value })}} 
                  className={touched.contactnumber && errors.contactnumber ? "error" : null} 
                />
                {touched.contactnumber && errors.contactnumber ? (<div className="error-message">{errors.contactnumber}</div>) : null}
              </Form.Group>
              <Form.Group controlId="formGroupResidentialAddress" className="pb-3">
                <Form.Label>Residential Address</Form.Label>
                <Form.Control 
                  type="text"
                  name="residentialaddress" 
                  placeholder="Enter Residential Address"
                  onBlur={handleBlur} 
                  value={values.residentialaddress}
                  onChange={event => {handleChange(event); this.setState({ residentialaddress: event.target.value })}} 
                  className={touched.residentialaddress && errors.residentialaddress ? "error" : null} 
                />
                {touched.residentialaddress && errors.residentialaddress ? (<div className="error-message">{errors.residentialaddress}</div>) : null}
              </Form.Group>
              <Form.Group controlId="formGroupBlockchainAddress" className="pb-3">
                <Form.Label>Blockchain Address</Form.Label>
                <Form.Control 
                  type="text"
                  name="bcaddress" 
                  placeholder="Enter Blockchain Address" 
                  onBlur={handleBlur} 
                  value={values.bcaddress}
                  onChange={event => {handleChange(event); this.setState({ bcaddress: event.target.value })}} 
                  className={touched.bcaddress && errors.bcaddress ? "error" : null} 
                />
                {touched.bcaddress && errors.bcaddress ? (<div className="error-message">{errors.bcaddress}</div>) : null}
              </Form.Group>
              <Button variant="primary" type="submit" onClick={this.addPatient}>
                Submit
              </Button>
              </>
              )}
            </Formik>
          </Col>
        
          <Col lg={8}>
            <h2><font color="turqoise">Patient List</font></h2>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-3" onChange={this.searchPatient}/>
            </Form>
            <Accordion>
              <Card> 
                { this.state.filteredPatients.map((patient, key) => {
                  return(
                    <>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey={key}>
                          <span className="patient">{patient.name}</span>
                        </Accordion.Toggle>  
                      </Card.Header>
                        <Accordion.Collapse eventKey={key}>
                          <Card.Body>
                            <ListGroup variant="flush">
                              <ListGroup.Item><span className="patient">ID: {patient.id.toString()}</span></ListGroup.Item>
                              <ListGroup.Item><span className="patient">Date Of Birth: {patient.dob}</span></ListGroup.Item>
                              <ListGroup.Item><span className="patient">Gender: {patient.gender}</span></ListGroup.Item>
                              <ListGroup.Item><span className="patient">Contact Number: {patient.contactnumber}</span></ListGroup.Item>
                              <ListGroup.Item><span className="patient">Residential Address: {patient.residentialaddress}</span></ListGroup.Item>
                              <ListGroup.Item><span className="patient">Public Address: {patient.bcaddress}</span></ListGroup.Item>
                            </ListGroup>
                          </Card.Body>
                        </Accordion.Collapse>
                    </>)
                })}
              </Card>
            </Accordion>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Admin;