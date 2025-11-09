// ===== Custom Message Display =====
function showMessage(text, color = "#4CAF50") {
  const box = document.getElementById("messageBox");
  box.textContent = text;
  box.style.display = "block";
  box.style.backgroundColor = color;
  setTimeout(() => { box.style.display = "none"; }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("#attendanceTable");

  // ===== Update Row Colors and Messages =====
  function updateRow(row) {
    const cells = row.querySelectorAll("td");
    const attendanceCells = Array.from(cells).slice(3, 9);
    const participationCells = Array.from(cells).slice(9, 15);
    const messageCell = cells[15];

    const absences = attendanceCells.filter(c => !c.querySelector("input").checked).length;
    const participations = participationCells.filter(c => c.querySelector("input").checked).length;

    row.classList.remove("green", "yellow", "red");
    if (absences < 3) row.classList.add("green");
    else if (absences <= 4) row.classList.add("yellow");
    else row.classList.add("red");

    let message = "";
    if (absences < 3 && participations >= 4)
      message = "Good attendance – Excellent participation";
    else if (absences <= 4)
      message = "Warning – attendance low – You need to participate more";
    else
      message = "Excluded – too many absences – You need to participate more";

    messageCell.textContent = `${absences} Abs, ${participations} Par — ${message}`;
  }

  function updateAllRows() {
    table.querySelectorAll("tbody tr").forEach(updateRow);
  }
  updateAllRows();

  function attachCheckboxListeners() {
    table.querySelectorAll("input[type='checkbox']").forEach(box => {
      box.addEventListener("change", updateAllRows);
    });
  }
  attachCheckboxListeners();

  // ===== Add New Student =====
  document.querySelector("#studentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const studentID = document.getElementById("studentID").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const firstName = document.getElementById("firstName").value.trim();

    const existingIDs = Array.from(document.querySelectorAll("tbody tr td:first-child"))
      .map(td => td.textContent.trim());
    if (existingIDs.includes(studentID)) {
      showMessage("This student already exists!", "#f44336");
      return;
    }

    const tbody = document.querySelector("tbody");
    const newRow = document.createElement("tr");
    let rowHTML = `<td>${studentID}</td><td>${lastName}</td><td>${firstName}</td>`;
    for (let i = 0; i < 6; i++) rowHTML += `<td><input type="checkbox"></td>`;
    for (let i = 0; i < 6; i++) rowHTML += `<td><input type="checkbox"></td>`;
    rowHTML += `<td></td>`;
    newRow.innerHTML = rowHTML;
    tbody.appendChild(newRow);
    attachCheckboxListeners();
    updateRow(newRow);
    event.target.reset();
    showMessage("New student successfully added!", "#4CAF50");
  });
});

// ===== Report Feature =====
document.getElementById("showReportBtn").addEventListener("click", () => {
  const rows = document.querySelectorAll("#attendanceTable tbody tr");
  const studentNames = [], attendanceCounts = [], participationCounts = [];

  rows.forEach(row => {
    const firstName = row.cells[2].textContent.trim();
    const lastName = row.cells[1].textContent.trim();
    studentNames.push(`${firstName} ${lastName}`);

    const boxes = Array.from(row.querySelectorAll("td input"));
    attendanceCounts.push(boxes.slice(0, 6).filter(b => b.checked).length);
    participationCounts.push(boxes.slice(6, 12).filter(b => b.checked).length);
  });

  document.getElementById("reportSection").style.display = "block";
  const ctx = document.getElementById("reportChart").getContext("2d");
  if (window.attendanceChart) window.attendanceChart.destroy();

  window.attendanceChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: studentNames,
      datasets: [
        { label: 'Attendance', data: attendanceCounts, backgroundColor: '#2196F3' },
        { label: 'Participation', data: participationCounts, backgroundColor: '#4CAF50' }
      ]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true, max: 6, title: { display: true, text: 'Sessions (max 6)' } },
        y: { title: { display: true, text: 'Students' } }
      },
      plugins: {
        title: { display: true, text: 'Attendance & Participation per Student' }
      }
    }
  });
});

// ===== jQuery Hover + Click + Highlight / Reset =====
$(document).ready(function() {

  // Hover effect
  $("#attendanceTable tbody").on("mouseenter", "tr", function() {
    if ($(this).hasClass("green")) $(this).css("background-color", "#9de1b0");
    else if ($(this).hasClass("yellow")) $(this).css("background-color", "#fff27b");
    else if ($(this).hasClass("red")) $(this).css("background-color", "#ff8a8a");
    else $(this).css("background-color", "#d9f7ff");
  }).on("mouseleave", "tr", function() {
    $(this).css("background-color", "");
  });

  // Click row → show info
  $("#attendanceTable tbody").on("click", "tr", function() {
    const firstName = $(this).find("td:nth-child(3)").text().trim();
    const lastName = $(this).find("td:nth-child(2)").text().trim();
    const absences = $(this).find("td input[type='checkbox']").slice(0, 6).filter((i, el) => !el.checked).length;
    showMessage(`Student: ${firstName} ${lastName} — Absences: ${absences}`, "#2196F3");
  });

  // Highlight excellent students
  $("#highlightBtn").on("click", function() {
    $("#attendanceTable tbody tr").each(function() {
      const absences = $(this).find("td input[type='checkbox']").slice(0, 6).filter((i, el) => !el.checked).length;
      if (absences < 3) {
        $(this).addClass("excellent-highlight");
        setTimeout(() => $(this).removeClass("excellent-highlight"), 1000);
      }
    });
    showMessage("Excellent students highlighted!", "#4CAF50");
  });

  // Reset button
  $("#resetBtn").on("click", function() {
    $("#attendanceTable tbody tr").removeClass("excellent-highlight").css({ "box-shadow": "none", "opacity": "1" });
    showMessage("Colors reset.", "#757575");
  });
});


