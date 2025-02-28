

    document.getElementById("myInput").addEventListener("keyup", function() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
  
      // Loop through all table rows, and hide those that don't match the search query
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        if (td) {
          var showRow = false;
          for (var j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              showRow = true;
              break; // Stop searching once a match is found in any column
            }
          }
          tr[i].style.display = showRow ? "" : "none"; // Show or hide the row
        }
      }
    });
  
    // Sort function
    function sortTable(n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.querySelector("table");
      switching = true;
      dir = "asc"; // Set the sorting direction to ascending by default
  
      // Get all arrows and reset them to the up direction
      var arrows = document.querySelectorAll('th i');
      arrows.forEach(function(arrow) {
        arrow.classList.remove('bi-chevron-down', 'bi-chevron-up');
        arrow.classList.add('bi-chevron-up');
      });
  
      while (switching) {
        switching = false;
        rows = table.rows;
  
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
  
          // Compare the two rows based on the selected column (x, y)
          if (dir === "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else if (dir === "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
  
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount++; // Increase switch count
        } else {
          if (switchcount === 0 && dir === "asc") {
            dir = "desc"; // If no switching has occurred and the direction is asc, set the direction to desc
            switching = true;
          }
        }
      }
  
      // Toggle the arrows for the sorted column
      var arrow = document.getElementById('arrow-' + n);
      if (dir === "asc") {
        arrow.classList.remove('bi-chevron-up');
        arrow.classList.add('bi-chevron-down');
      } else {
        arrow.classList.remove('bi-chevron-down');
        arrow.classList.add('bi-chevron-up');
      }
    }
  