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
  let date = new Date(output[5] + "T12:00:00");
  let dateArr = date.toLocaleDateString().split("/");
  let prefix = !!output[3] ? output[3].toUpperCase() : "A";
  let tag =
    dateArr[0].padStart(2, "0") +
    dateArr[1].padStart(2, "0") +
    dateArr[2].slice(2, 4) +
    prefix;

  let qty = Number(output[4]);

  wrapper.innerHTML = `
<button type="button" onclick="window.print()" class="hide-print" >Print</button>
<button type="button" onclick="window.location.reload()" class="hide-print">New Form</button>
<br/><br />
`;

  for (let i = 1; i <= qty; i++) {
    wrapper.innerHTML += i === 1 ? "" : '<div class="pagebreak" ></div>';
    wrapper.innerHTML += `
  <img src="fp_logo.svg" width="300">
    <h1 class="red">QA Hold</h1>
    <h3>Reason: ${output[0]}</h3>
    <h3>Issued By: ${output[1]}</h3>
    <h3>Pending: ${output[2]}</h3>
    <h3>Tag: ${tag + String(i).padStart(3, "0")}</h3>
    <h5>Issued Date: ${new Date(
      output[5] + "T12:00:00",
    ).toLocaleDateString()}</h5>
      `;
  }
});

extendForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(extendForm);
  let output = [];
  for (const entry of data) {
    output.push(entry[1]);
  }
  wrapper.innerHTML = `
<button type="button" onclick="window.print()" class="hide-print" >Print</button>
<button type="button" onclick="window.location.reload()" class="hide-print">New Form</button>
<br /><br />
      <img src="fp_logo.svg" width="300">
        <h2 class="red title">Extended Expiration</h2>
        <h3>Item: ${output[0]}</h3>
        <h3>Lot#: ${output[1]}</h3>
        <h4>Prev Exp: ${new Date(
    output[2] + "T12:00:00",
  ).toLocaleDateString()}</h4>
        <h4>Extended To: ${new Date(
    output[3] + "T12:00:00",
  ).toLocaleDateString()}</h4>
        <h3>Approved By: ${output[4]}</h3>
        <h5>Issued Date: ${new Date(
    output[5] + "T12:00:00",
  ).toLocaleDateString()}</h5>
        `;
});
