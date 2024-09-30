let data = [
    { id: 1, chemicalName: 'Ammonium Persulfate', vendor: 'LG Chem', density: 3525.92, viscosity: 60.63, packaging: 'Bag', packSize: 100, unit: 'kg', quantity: 6495.18 },
    { id: 2, chemicalName: 'Caustic Potash', vendor: 'Formosa', density: 3172.15, viscosity: 48.22, packaging: 'Bag', packSize: 100, unit: 'kg', quantity: 8751.90 },
    { id: 3, chemicalName: 'Dimethylaminopropylamino', vendor: 'LG Chem', density: 8435.37, viscosity: 12.62, packaging: 'Barrel', packSize: 75, unit: 'L', quantity: 5964.61 },
    { id: 4, chemicalName: 'Mono Ammonium Phosphate', vendor: 'Sinopec', density: 1597.65, viscosity: 76.51, packaging: 'Bag', packSize: 105, unit: 'kg', quantity: 8183.73 },
    { id: 5, chemicalName: 'Ferric Nitrate', vendor: 'DowDuPont', density: 364.04, viscosity: 14.90, packaging: 'Bag', packSize: 105, unit: 'kg', quantity: 4154.33 }
  ];
  
  let selectedRowIndex = null;
  
  // Render the table rows
  function renderTable(data) {
    const tbody = document.getElementById('chemicalTableBody');
    tbody.innerHTML = '';
    
    data.forEach((row, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.id}</td>
        <td><input type="text" value="${row.chemicalName}" onblur="updateData(${index}, 'chemicalName', this.value)" /></td>
        <td><input type="text" value="${row.vendor}" onblur="updateData(${index}, 'vendor', this.value)" /></td>
        <td><input type="number" value="${row.density}" onblur="updateData(${index}, 'density', this.value)" /></td>
        <td><input type="number" value="${row.viscosity}" onblur="updateData(${index}, 'viscosity', this.value)" /></td>
        <td><input type="text" value="${row.packaging}" onblur="updateData(${index}, 'packaging', this.value)" /></td>
        <td><input type="number" value="${row.packSize}" onblur="updateData(${index}, 'packSize', this.value)" /></td>
        <td><input type="text" value="${row.unit}" onblur="updateData(${index}, 'unit', this.value)" /></td>
        <td><input type="number" value="${row.quantity}" onblur="updateData(${index}, 'quantity', this.value)" /></td>
      `;
      
      tr.onclick = () => selectRow(index);
      tbody.appendChild(tr);
    });
  }
  
  // Function to update data when the user changes values in input fields
  function updateData(rowIndex, field, value) {
    data[rowIndex][field] = value;
  }
  
  // Select a row and highlight it
  function selectRow(index) {
    const rows = document.querySelectorAll('#chemicalTableBody tr');
    
    rows.forEach((row, i) => {
      row.classList.remove('selected');
      if (i === index) {
        row.classList.add('selected');
        selectedRowIndex = index;
      }
    });
  }
  
  // Add a new row (with editable input fields)
  document.getElementById('addRowBtn').onclick = () => {
    const newRow = {
      id: data.length + 1,
      chemicalName: '',
      vendor: '',
      density: 0,
      viscosity: 0,
      packaging: '',
      packSize: 0,
      unit: '',
      quantity: 0
    };
    data.push(newRow);
    renderTable(data);
    selectRow(data.length - 1);
  };
  
  // Move row up
  document.getElementById('moveRowUpBtn').onclick = () => {
    if (selectedRowIndex === null || selectedRowIndex === 0) return;
    
    const temp = data[selectedRowIndex];
    data[selectedRowIndex] = data[selectedRowIndex - 1];
    data[selectedRowIndex - 1] = temp;
    selectedRowIndex--;
    renderTable(data);
    selectRow(selectedRowIndex);
  };
  
  // Move row down
  document.getElementById('moveRowDownBtn').onclick = () => {
    if (selectedRowIndex === null || selectedRowIndex === data.length - 1) return;
    
    const temp = data[selectedRowIndex];
    data[selectedRowIndex] = data[selectedRowIndex + 1];
    data[selectedRowIndex + 1] = temp;
    selectedRowIndex++;
    renderTable(data);
    selectRow(selectedRowIndex);
  };
  
  // Delete a row
  document.getElementById('deleteRowBtn').onclick = () => {
    if (selectedRowIndex === null) return;
    
    data.splice(selectedRowIndex, 1);
    selectedRowIndex = null;
    renderTable(data);
  };
  
  // Refresh the table (reset to original data)
  document.getElementById('refreshBtn').onclick = () => {
    data = [
      { id: 1, chemicalName: 'Ammonium Persulfate', vendor: 'LG Chem', density: 3525.92, viscosity: 60.63, packaging: 'Bag', packSize: 100, unit: 'kg', quantity: 6495.18 },
      { id: 2, chemicalName: 'Caustic Potash', vendor: 'Formosa', density: 3172.15, viscosity: 48.22, packaging: 'Bag', packSize: 100, unit: 'kg', quantity: 8751.90 },
      { id: 3, chemicalName: 'Dimethylaminopropylamino', vendor: 'LG Chem', density: 8435.37, viscosity: 12.62, packaging: 'Barrel', packSize: 75, unit: 'L', quantity: 5964.61 },
      { id: 4, chemicalName: 'Mono Ammonium Phosphate', vendor: 'Sinopec', density: 1597.65, viscosity: 76.51, packaging: 'Bag', packSize: 105, unit: 'kg', quantity: 8183.73 },
      { id: 5, chemicalName: 'Ferric Nitrate', vendor: 'DowDuPont', density: 364.04, viscosity: 14.90, packaging: 'Bag', packSize: 105, unit: 'kg', quantity: 4154.33 }
    ];
    selectedRowIndex = null;
    renderTable(data);
  };
  
  // Save the table data (just logs to console for now)
  document.getElementById('saveBtn').onclick = () => {
    console.log('Table data saved:', data);
  };
  
  // Attach sorting functionality
  document.querySelectorAll('.sortable').forEach(header => {
    header.onclick = () => sortTable(header.dataset.column);
  });
  
  // Initial render
  renderTable(data);
  
  
  