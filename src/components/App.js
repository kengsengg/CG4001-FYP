import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Admin from './Admin';
import Doctor from './Doctor';
import Patient from './Patient';
import Unauthorized from './Unauthorized';
import Navbar from 'react-bootstrap/Navbar';

/*
 * Code adapted from Gregory McCubbin
 * (Source: https://github.com/dappuniversity/blockchain_login/blob/master/src/components/App.js retrieved in February 2019)
*/

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.fetchBlockchainData()
    await this.checkAuthorization()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected')
    }
  }

  async fetchBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }
  
  // Account addresses can be changed based on the accounts generated on Ganache
  async checkAuthorization() {
    const adminAccounts = [
      '0xE271a09cF1cD756eC998d05C459C95dbf02605a8', // Admin
    ]
    const doctorAccounts = [
      '0x0706318D909c78A9425D97167558fd23Fb083776', // Doctor
    ]
    const patientAccounts = [
      '0xe326AFE1bDFe51Cb90E84BfB8cC01224A36a6a44', // Patient
    ]
  
    if (adminAccounts.includes(this.state.account)) {
      this.setState({ user: "admin" })
    } else if (doctorAccounts.includes(this.state.account)) {
      this.setState({ user: "doctor" })
    } else if (patientAccounts.includes(this.state.account)) {
      this.setState({ user: "patient" })
    } else {
      this.setState({ user: "unauthorized" })
    }
  }
  
  constructor(props) {
      super(props);
      this.state = {
          account: '',
          user: ["admin", "doctor", "patient", "unauthorized"],
          patientCount: 0
      };
  }  

  render() {
    let body

    if (this.state.user === "admin") {
      body = <Admin account={this.state.account} />
    } else if (this.state.user === "doctor") {
      body = <Doctor account={this.state.account} />
    } else if (this.state.user === "patient") {
      body = <Patient account={this.state.account} />
    } else {
      body = <Unauthorized account={this.state.account} />
    }
    
    return (
      <div>
        <Navbar bg="info" variant="dark" expand="lg">
          <Navbar.Brand>Healthcare Records Ethereum Blockchain</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Account: {this.state.account}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <div class="container-fluid mt-3">
          {body}
        </div>
      </div>
    );
  }
}

export default App;