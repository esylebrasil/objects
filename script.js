"use strict";

var registryData = [];


// Add Item to List
$("#addItem").click(function() {
  displayForm();
});

// Cancel the Form
$("#cancelForm").click(function() {
  displayTable();
});

// Submit New Item
$("#registry-form").submit(function() {
  event.preventDefault();
  registryData.push({
    item: $("#itemName").val(),
    description: $("#itemDesc").val(),
    amount: $("#itemAmt").val(),
    location: $("#itemLoc").val(),
    quantity: $("#itemCount").val(),
  });
  displayTable();
  displayRegistryData();
  $("input, select").val("");
});

function displayRegistryData() {
  $("#registry-table-tbody").empty();
  for (var i = 0; i < registryData.length; i++) {
    $("#registry-table-tbody").append("<tr><td>" + registryData[i].item + "</td><td>" + registryData[i].description + "</td><td>" + registryData[i].amount + "</td><td>" + registryData[i].location + "</td><td>" + registryData[i].quantity + "</td><td><button class='editBtn'>Edit</button>&nbsp;<button class='deleteBtn'>Delete</button></td></tr>");
  }
  
  // Delete Existing Item
  $(".deleteBtn").click(function() {
    $(this).parents("tr").remove();
    var deleteId = $(this).parents().siblings(":first").text();
    registryData = registryData.filter(function(el) {
      return el.item !== deleteId;
    });
  });
  
  // Edit Existing Item
  $(".editBtn").click(function() {
    var editId = $(this).parents().siblings(":first").text();
    var itemToEdit = $.grep(registryData, function(el) {
      return el.item === editId;
    })[0];
    displayForm();
    $("#itemName").val(itemToEdit.item);
    $("#itemDesc").val(itemToEdit.description);
    $("#itemAmt").val(itemToEdit.amount);
    $("#itemLoc").val(itemToEdit.location);
    $("#itemCount").val(itemToEdit.quantity);
    registryData = registryData.filter(function(el) {
      return el.item !== editId;
    });
  });
}

// Show Table Hide Form
function displayTable() {
  $("#registry-form").hide();
  $("#registry-table").show();
}
// Show Form Hide Table
function displayForm() {
  $("#registry-table").hide();
  $("#registry-form").show();
}

