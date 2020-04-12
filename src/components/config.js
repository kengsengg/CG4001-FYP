// Address of smart contract deployed to Ganache, value has to be updated upon migration again
export const HEALTHCARE_RECORD_ADDRESS = '0x3F2132AA1457ba0c149f2aCE6adbB932E3a03f2b'

// Update after changes made to HealthcareRecord.sol
export const HEALTHCARE_RECORD_ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "patients",
    "outputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "dob",
        "type": "string"
      },
      {
        "name": "gender",
        "type": "string"
      },
      {
        "name": "contactnumber",
        "type": "string"
      },
      {
        "name": "residentialaddress",
        "type": "string"
      },
      {
        "name": "bcaddress",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "patientCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "dob",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "gender",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "contactnumber",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "residentialaddress",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "bcaddress",
        "type": "string"
      }
    ],
    "name": "PatientAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "contactnumber",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "residentialaddress",
        "type": "string"
      }
    ],
    "name": "PatientUpdated",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_dob",
        "type": "string"
      },
      {
        "name": "_gender",
        "type": "string"
      },
      {
        "name": "_contactnumber",
        "type": "string"
      },
      {
        "name": "_residentialaddress",
        "type": "string"
      },
      {
        "name": "_bcaddress",
        "type": "string"
      }
    ],
    "name": "addPatient",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_bcaddress",
        "type": "string"
      }
    ],
    "name": "viewPatient",
    "outputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "_contactnumber",
        "type": "string"
      },
      {
        "name": "_residentialaddress",
        "type": "string"
      }
    ],
    "name": "updatePatient",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]