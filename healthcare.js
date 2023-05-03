    var contractAddress = '0x2E560BB7c3f450658A9b6dd73Cb4cb9F24fE6355';
    var abi = [
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_labAdmin",
            "type": "address"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "ID",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "testName",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "date",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "hospitalName",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
        }
    ],
    "name": "recordCreated",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "ID",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "testName",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "date",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "hospitalName",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
        }
    ],
    "name": "recordSigned",
    "type": "event"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "_records",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "ID",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "signatureCount",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "testName",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "date",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "hospitalName",
            "type": "string"
        },
        {
            "internalType": "bool",
            "name": "isValue",
            "type": "bool"
        },
        {
            "internalType": "address",
            "name": "pAddr",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "hospitalAdmin",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "labAdmin",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_ID",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "_tName",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_date",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "hName",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
        }
    ],
    "name": "newRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "recordsArr",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_ID",
            "type": "uint256"
        }
    ],
    "name": "signRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}
]
    async function loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        }
    }

    async function loadContract() {
        return await new window.web3.eth.Contract(abi, contractAddress);
    }

    async function getCurrentAccount() {
        const accounts = await window.web3.eth.getAccounts();
        return accounts[0];
    }

    async function findRecord() {
        updateStatus('finding record...');
const recordID = txtFindRecord.value;
const foundRecord = await window.contract.methods._records(recordID).call();

let formattedRecord = '';
for (const [key, value] of Object.entries(foundRecord)) {
formattedRecord += `${key}: ${value}<br>`;
}

document.addEventListener('DOMContentLoaded', () => {
document.getElementById('record').innerHTML = formattedRecord;
document.getElementById('tName').textContent = foundRecord.testName;
document.getElementById('date').textContent = foundRecord.date;
document.getElementById('hName').textContent = foundRecord.hospitalName;
document.getElementById('price').textContent = foundRecord.price;
});
updateStatus(`record: ${JSON.stringify(foundRecord, ["ID", "testName", "date", "price"], 2)}`);
}

    async function enterNewRecord() {
        const recordID = txtEnterNewID.value;
        const tName = txtEnterNewName.value;
        const date = txtEnterNewDate.value;
        const hName = txtEnterNewHospital.value;
        const price = txtEnterNewPrice.value;
        updateStatus('creating new record...');
        const account = await getCurrentAccount();
        const _recordID = await window.contract.methods.newRecord(recordID, tName, date, hName, price).send({ from: account});
        updateStatus('New record created!')
    }

    async function hospitalAdmin() {
        updateStatus(`Retrieving hospital Admin Address...`);
        const hospitalAdminAddress = await window.contract.methods.hospitalAdmin().call();
        updateStatus(`Hospital Admin Address: ${hospitalAdminAddress}`);
    }

    async function labAdmin() {
        updateStatus(`Retrieving Lab Admin Address...`);
        const labAdminAddress = await window.contract.methods.labAdmin().call();
        updateStatus(`Lab Address: ${labAdminAddress}`);
    }

    async function signRecord() {
        const signID = txtSignRecord.value;
        updateStatus(`signing record with ID of : ` + signID) + '...';
        const account = await getCurrentAccount();
        const signatureID = await window.contract.methods.signRecord(signID).send({ from: account });
        updateStatus('Signed record!');
    }

    async function load() {
        await loadWeb3();
        window.contract = await loadContract();
        updateStatus('Ready!');
    }

    function updateStatus(status) {
        const statusEl = document.getElementById('status');
        statusEl.innerHTML = status;
        console.log(status);
    }

    load();