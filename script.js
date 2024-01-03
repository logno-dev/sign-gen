const wrapper = document.querySelector(".wrapper");
const holdForm = document.getElementById("hold");
const extendForm = document.getElementById("extend");

const currentDate = document.querySelectorAll(".today");

currentDate.forEach((el) => {
  el.value = new Date().toISOString().split("T")[0];
});

holdForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(holdForm);
  let output = [];
  for (const entry of data) {
    output.push(entry[1]);
  }
  wrapper.innerHTML = `<h1 class="red">QA Hold</h1>
    <h3>Reason: ${output[0]}</h3>
    <h3>Issued By: ${output[1]}</h3>
    <h3>Pending: ${output[2]}</h3>
    <h5>Issued Date: ${new Date(output[3]).toLocaleDateString()}</h5>
    <button type="button" onclick="window.print()" class="hide-print" >Print</button>
  <button type="button" onclick="window.location.reload()" class="hide-print">New Form</button>
    `;
});

extendForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(extendForm);
  let output = [];
  for (const entry of data) {
    output.push(entry[1]);
  }
  wrapper.innerHTML = `<h2 class="red title">Extended Expiration</h2>
    <h3>Item: ${output[0]}</h3>
    <h3>Lot#: ${output[1]}</h3>
    <h4>Prev Exp: ${new Date(output[2]).toLocaleDateString()}</h4>
    <h4>Extended To: ${new Date(output[3]).toLocaleDateString()}</h4>
    <h3>Approved By: ${output[4]}</h3>
    <h5>Issued Date: ${new Date(output[5]).toLocaleDateString()}</h5>
    <button type="button" onclick="window.print()" class="hide-print" >Print</button>
  <button type="button" onclick="window.location.reload()" class="hide-print">New Form</button>
    `;
});
