pragma solidity ^0.5.0;

contract HealthcareRecord {
    uint public patientCount = 0;

    struct Patient {
        uint id;
        string name;
        string dob;
        string gender;
        string contactnumber;
        string residentialaddress;
        string bcaddress;
    }

    // dynamic size, need to reference one by one
    mapping(uint => Patient) public patients;

    constructor() public {
        addPatient("Jack", "25/12/1990", "Male", "90123456", "Blk 10 Clementi Way #08-01 S600123", "0x1E581a1652a0669F1A7CD9fA2132b72a0aFe661D");
    }

    function addPatient(string memory _name, string memory _dob, string memory _gender,
        string memory _contactnumber, string memory _residentialaddress, string memory _bcaddress) public {
        patientCount ++;
        patients[patientCount] = Patient(patientCount, _name, _dob, _gender, _contactnumber, _residentialaddress, _bcaddress);
        emit PatientAdded(patientCount, _name, _dob, _gender, _contactnumber, _residentialaddress, _bcaddress);
    }

    function viewPatient(string memory _bcaddress) public view returns (uint id, string memory, string memory,
    string memory, string memory, string memory, string memory) {
        for (uint i = 1; i <= patientCount; i++) {
            if (keccak256(abi.encodePacked(_bcaddress)) == keccak256(abi.encodePacked(patients[i].bcaddress))) {
                Patient memory p = patients[i];
                return (p.id, p.name, p.dob, p.gender, p.contactnumber, p.residentialaddress, p.bcaddress);
            }
        }
    }

    function updatePatient(uint id, string memory _contactnumber, string memory _residentialaddress) public {
        patients[id].contactnumber = _contactnumber;
        patients[id].residentialaddress = _residentialaddress;
        emit PatientUpdated(id,  _contactnumber, _residentialaddress);
    }

    event PatientAdded(
        uint id,
        string name,
        string dob,
        string gender,
        string contactnumber,
        string residentialaddress,
        string bcaddress
    );

    event PatientUpdated(
        uint id,
        string contactnumber,
        string residentialaddress
    );
}