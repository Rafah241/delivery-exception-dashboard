const form = document.querySelector("#exceptionForm");
const tableBody = document.querySelector("#tableBody");

const filterIssue = document.querySelector("#filterIssue");
const filterStatus = document.querySelector("#filterStatus");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const deliveryId = document.querySelector("#deliveryId").value;
    const customerName = document.querySelector("#customerName").value;
    const issueType = document.querySelector("#issueType").value;
    const priority = document.querySelector('input[name="priority"]:checked').value;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${deliveryId}</td>
        <td>${customerName}</td>
        <td>${issueType}</td>
        <td>${priority}</td>
        <td class="status">Open</td>
        <td>
            <button class="resolveBtn">Resolve</button>
            <button class="deleteBtn">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);
    form.reset();
});

tableBody.addEventListener("click", function(e) {

    if (e.target.classList.contains("resolveBtn")) {
        const row = e.target.closest("tr");
        row.querySelector(".status").textContent = "Resolved";
        row.classList.add("resolved");
        e.target.disabled = true;
    }

    if (e.target.classList.contains("deleteBtn")) {
        if (confirm("Delete this record?")) {
            e.target.closest("tr").remove();
        }
    }
});

filterIssue.addEventListener("change", applyFilters);
filterStatus.addEventListener("change", applyFilters);

function applyFilters() {
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const issue = row.children[2].textContent;
        const status = row.children[4].textContent;

        const issueMatch =
            filterIssue.value === "All" || filterIssue.value === issue;

        const statusMatch =
            filterStatus.value === "All" || filterStatus.value === status;

        row.style.display = (issueMatch && statusMatch) ? "" : "none";
    });
}
