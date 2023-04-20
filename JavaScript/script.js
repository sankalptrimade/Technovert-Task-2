import { Contact, ContactService } from "./services.js";

var emptyRow = "<h3>No Records Available</h3>";

$(document).ready(function () {
  var contactService = new ContactService();
  debugger;
  loadData();
  // $('.name-check').hide();
  // $('.email-check').hide();
  // $('.mobile-check').hide();
  // $('.landline-check').hide();
  // $('.website-check').hide();
  // $('.address-check').hide();

  $(".add-btn").css("background", "lightgreen");
  $(".add-popup").click(function () {
    $(".details").css("display", "block");
    $(".show-data").css("display", "none");
    clearForm();
    $("#txt-Id").val("");
    $(".add-btn").text("Add");
  });

  $(".close-btn").click(function () {
    $(".details").css("display", "none");
    $(".show-data").css("display", "flex");
  });

  $(".add-btn").click(function () {
    debugger;

    if ($("#txt-Id").val() == "") {
      // addData();
      const userDetails = {
        Id: contactService.getId(),
        name: $("#txt-name").val(),
        email: $("#txt-email").val(),
        mobile: $("#txt-mobile").val(),
        landline: $("#txt-landline").val(),
        website: $("#txt-website").val(),
        address: $("#txt-address").val(),
      };
      var contact = new Contact(userDetails);
      contactService.add(contact);
    } else {
      const userDetails = {
        Id: $("#txt-Id").val(),
        name: $("#txt-name").val(),
        email: $("#txt-email").val(),
        mobile: $("#txt-mobile").val(),
        landline: $("#txt-landline").val(),
        website: $("#txt-website").val(),
        address: $("#txt-address").val(),
      };
      var contact = new Contact(userDetails);
      contactService.updateData(contact);
      loadData();
      clearForm();
    }
  });

  $(".show-data").on("click", ".delete", function () {
    const cnf = confirm("Are you sure you want to delete this data?");
    if (cnf == true) {
      const id = $(this)
        .parent()
        .parent()
        .find(".view-details-name")
        .attr("data-id");
      contactService.deleteData(id);
    } else {
      loadData();
    }
    // location.reload();
  });

  $(".showDetails").click(function () {
    debugger;
    const id = $(this).find(".fullName").attr("data-id");
    contactService.showData(id);
    $(".details").css("display", "none");
    $(".show-data").css("display", "flex");
  });

  $(".show-data").on("click", ".edit", function () {
    // debugger;
    const name = $(this).parent().parent().find(".view-details-name").html();
    const email = $(this)
      .parent()
      .parent()
      .find(".view-details-email")
      .html()
      .slice(7);
    const mobile = $(this)
      .parent()
      .parent()
      .find(".view-details-mobile")
      .html()
      .slice(12);
    const landline = $(this)
      .parent()
      .parent()
      .find(".view-details-landline")
      .html()
      .slice(14);
    const website = $(this)
      .parent()
      .parent()
      .find(".view-details-website")
      .html()
      .slice(9);
    const address = $(this)
      .parent()
      .parent()
      .find(".view-details-address")
      .html()
      .slice(9);
    const id = $(this)
      .parent()
      .parent()
      .find(".view-details-name")
      .attr("data-id");

    $("#txt-name").val(name);
    $("#txt-email").val(email);
    $("#txt-mobile").val(mobile);
    $("#txt-landline").val(landline);
    $("#txt-website").val(website);
    $("#txt-address").val(address);
    $("#txt-Id").val(id);
    $(".add-btn").text("Update");
    $(".details").css("display", "block");
    $(".show-data").css("display", "none");
  });

  $("#user-details").keyup(function () {
    // debugger;
    var addBtn = $(".add-btn");

    if (
      $("#txt-name").val().trim() != "" &&
      $("#txt-email").val().trim() != "" &&
      $("#txt-mobile").val().trim() != "" &&
      $("#txt-landline").val().trim() != "" &&
      $("#txt-website").val().trim() != "" &&
      $("#txt-address").val().trim() != ""
    ) {
      addBtn.removeAttr("disabled");
      $(".add-btn").css("background", "green");
    } else {
      addBtn.attr("disabled", "disabled");
    }
  });
});

function clearForm() {
  $("#txt-name").val("");
  $("#txt-email").val("");
  $("#txt-mobile").val("");
  $("#txt-landline").val("");
  $("#txt-website").val("");
  $("#txt-address").val("");
}

function loadData() {
  let localData = localStorage.getItem("localData");
  if (localData != null) {
    $(".contacts-list").html("");
    let localArray = JSON.parse(localData);
    let index = 1;
    localArray.forEach((element) => {
      let dynamicDiv = '<div class="showDetails">';
      dynamicDiv =
        dynamicDiv +
        "<h3 class = 'fullName' data-Id=" +
        element.Id +
        ">" +
        element.name +
        "</h3>";
      dynamicDiv =
        dynamicDiv + "<p class = 'fullEmail'>" + element.email + "</p>";
      dynamicDiv =
        dynamicDiv + "<p class = 'fullMobile'>" + element.mobile + "</p>";
      $(".contacts-list").append(dynamicDiv);
      index++;
    });
  }
  addEmptyRow();
}

function addEmptyRow() {
  debugger;
  if ($(".contacts-list").children().length == 0) {
    $(".contacts-list").append(emptyRow);
  }
}
