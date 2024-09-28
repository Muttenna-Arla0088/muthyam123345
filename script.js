let data = [
    { id: 1, chemicalName: 'Chemical A', vendor: 'Vendor 1', density: '1.0 g/cm3', viscosity: '10 cP', packaging: 'Bottle', packSize: '500 ml', unit: 'g', quantity: 20 },
    { id: 2, chemicalName: 'Chemical B', vendor: 'Vendor 2', density: '0.9 g/cm3', viscosity: '12 cP', packaging: 'Can', packSize: '1 L', unit: 'kg', quantity: 30 },
    // Add more data for 15 rows if needed...
  ];
  
  // Variable to track selected row
  let selectedRow = null;
  
  // Function to render the table data
  function renderTableData(data) {
    const tableBody = document.querySelector("#chemicalTable tbody");
    tableBody.innerHTML = ''; // Clear the table
  
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.chemicalName}</td>
        <td>${item.vendor}</td>
        <td>${item.density}</td>
        <td>${item.viscosity}</td>
        <td>${item.packaging}</td>
        <td>${item.packSize}</td>
        <td>${item.unit}</td>
        <td>${item.quantity}</td>
      `;
  
      // Add click event to select row
      row.addEventListener('click', () => {
        document.querySelectorAll('tr').forEach(tr => tr.classList.remove('selected'));
        row.classList.add('selected');
        selectedRow = row;
      });
  
      tableBody.appendChild(row);
    });
  }
  
  // Initial render
  renderTableData(data);
  
  // Function to sort data
  function sortTable(column) {
    const isAscending = this.classList.toggle('asc');
    data.sort((a, b) => {
      if (a[column] > b[column]) return isAscending ? 1 : -1;
      if (a[column] < b[column]) return isAscending ? -1 : 1;
      return 0;
    });
    renderTableData(data);
  }
  
  // Sorting events
  document.getElementById('sortId').addEventListener('click', () => sortTable.call(event.target, 'id'));
  document.getElementById('sortChemicalName').addEventListener('click', () => sortTable.call(event.target, 'chemicalName'));
  document.getElementById('sortVendor').addEventListener('click', () => sortTable.call(event.target, 'vendor'));
  // Add sort events for other columns
  
  // Add Row
  document.getElementById('addRow').addEventListener('click', () => {
    const newRow = {
      id: data.length + 1,
      chemicalName: prompt("Enter Chemical Name:"),
      vendor: prompt("Enter Vendor Name:"),
      density: prompt("Enter Density:"),
      viscosity: prompt("Enter Viscosity:"),
      packaging: prompt("Enter Packaging Type:"),
      packSize: prompt("Enter Pack Size:"),
      unit: prompt("Enter Unit:"),
      quantity: prompt("Enter Quantity:")
    };
  
    if (newRow.chemicalName && newRow.vendor) {
      data.push(newRow);
      renderTableData(data);
    } else {
      alert("Invalid data");
    }
  });
  
  // Delete selected row
  document.getElementById('deleteRow').addEventListener('click', () => {
    if (selectedRow) {
      const rowIndex = selectedRow.rowIndex - 1; // Adjust for header row
      data.splice(rowIndex, 1);
      selectedRow = null;
      renderTableData(data);
    } else {
      alert("Please select a row to delete.");
    }
  });
  
  // Move row up
  document.getElementById('moveRowUp').addEventListener('click', () => {
    if (selectedRow) {
      const rowIndex = selectedRow.rowIndex - 1;
      if (rowIndex > 0) {
        [data[rowIndex], data[rowIndex - 1]] = [data[rowIndex - 1], data[rowIndex]];
        renderTableData(data);
      }
    } else {
      alert("Please select a row to move.");
    }
  });
  
  // Move row down
  document.getElementById('moveRowDown').addEventListener('click', () => {
    if (selectedRow) {
      const rowIndex = selectedRow.rowIndex - 1;
      if (rowIndex < data.length - 1) {
        [data[rowIndex], data[rowIndex + 1]] = [data[rowIndex + 1], data[rowIndex]];
        renderTableData(data);
      }
    } else {
      alert("Please select a row to move.");
    }
  });
  
  // Refresh data
  document.getElementById('refreshData').addEventListener('click', () => {
    renderTableData(data); // Refresh the table data
    selectedRow = null; // Deselect any row
  });
  
  // Save data (store in localStorage)
  document.getElementById('saveData').addEventListener('click', () => {
    localStorage.setItem('chemicalData', JSON.stringify(data));
    alert("Data saved!");
  });
  
  // Load data from localStorage if available
  window.addEventListener('load', () => {
    const savedData = JSON.parse(localStorage.getItem('chemicalData'));
    if (savedData) {
      data = savedData;
      renderTableData(data);
    }
  });
  