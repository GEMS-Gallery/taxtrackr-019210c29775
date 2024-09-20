import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backend_idl, canisterId as backend_id } from "declarations/backend";

const agent = new HttpAgent();
const backend = Actor.createActor(backend_idl, { agent, canisterId: backend_id });

window.addTaxPayer = async function() {
    const tid = document.getElementById("tid").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;

    const result = await backend.addTaxPayer(tid, firstName, lastName, address);
    alert(result);
    loadAllTaxPayers();
}

window.searchTaxPayer = async function() {
    const tid = document.getElementById("searchTid").value;
    const result = await backend.searchTaxPayer(tid);
    const searchResultDiv = document.getElementById("searchResult");
    if (result) {
        searchResultDiv.innerHTML = `Found: ${result.firstName} ${result.lastName}, ${result.address}`;
    } else {
        searchResultDiv.innerHTML = "No TaxPayer found with that TID.";
    }
}

async function loadAllTaxPayers() {
    const taxpayers = await backend.getAllTaxPayers();
    const taxpayerList = document.getElementById("taxpayerList");
    taxpayerList.innerHTML = "";
    taxpayers.forEach(tp => {
        const li = document.createElement("li");
        li.textContent = `${tp.tid}: ${tp.firstName} ${tp.lastName}, ${tp.address}`;
        taxpayerList.appendChild(li);
    });
}

window.addEventListener("load", loadAllTaxPayers);
