// Run when the page is ready
window.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('attendanceTable');

  if (table) {
    // Add event listeners to all checkboxes
    table.querySelectorAll('input[type="checkbox"]').forEach(box => {
      box.addEventListener('change', updateTable);
    });

    // First calculation on load
    updateTable();
  }
});

// Function to calculate and update everything
function updateTable() {
  const rows = document.querySelectorAll('#attendanceTable tbody tr');

  rows.forEach(row => {
    const sessionBoxes = Array.from(row.querySelectorAll('td input')).slice(0, 6);
    const participationBoxes = Array.from(row.querySelectorAll('td input')).slice(6, 12);

    const absCell = row.querySelector('.abs');
    const parCell = row.querySelector('.par');
    const msgCell = row.querySelector('.msg');

    // Count absences (unchecked sessions)
    const absences = sessionBoxes.filter(b => !b.checked).length;
    // Count participations (checked participation)
    const participations = participationBoxes.filter(b => b.checked).length;

    // Display counts
    absCell.textContent = `${absences} Abs`;
    parCell.textContent = `${participations} Par`;

    // Color by absences
    if (absences < 3) row.style.backgroundColor = 'lightgreen';
    else if (absences <= 4) row.style.backgroundColor = 'khaki';
    else row.style.backgroundColor = 'lightcoral';

    // Message logic
    if (absences < 3 && participations >= 3)
      msgCell.textContent = 'Good attendance – Excellent participation';
    else if (absences <= 4)
      msgCell.textContent = 'Warning – attendance low – You need to participate more';
    else
      msgCell.textContent = 'Excluded – too many absences – You need to participate more';
  });
}

