import { Contact, ContactService } from "./services.js";

var emptyRow = "<h3>No Records Available</h3>";

$(document).ready(function () {
  var contactService = new ContactService();
  loadData();
  clearError();
  $(".add-btn").css("background", "lightgreen");
  $(".add-popup").click(function () {
    $(".details").show();
    $(".show-data").hide();
    clearForm();
    $("#txt-Id").val("");
    $(".add-btn").text("Add");
  });

  $(".close-btn").click(function () {
    $(".details").hide();
    $(".show-data").show();
    clearError();
  });

  $(".add-btn").click(function () {
    debugger;
    clearError();
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

  $(".show-data").on("click", ".delete, .view-details-delete", function () {
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
    location.href = "http://127.0.0.1:5500/HTML/index.html";
  });

  $(".showDetails").click(function () {
    debugger;
    const id = $(this).find(".fullName").attr("data-id");
    contactService.showData(id);
    $(".details").hide();
    $(".show-data").show();
    clearError();
  });

  $(".show-data").on("click", ".edit, .view-details-edit", function () {
    clearError();
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
      .slice(17);
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
    $(".details").show(); // css("display", "block");
    $(".show-data").hide(); // css("display", "none");
  });

  $("#user-details").keyup(function () {
    var addBtn = $(".add-btn");
    if (
      validate() == true &&
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
      $(".add-btn").css("background", "lightgreen");
    }
  });
});

export function showData(element) {
  $(".show-data").html("");
  let dynamicDiv = '<div class = "view-details">';
  dynamicDiv =
    dynamicDiv +
    '<h3 class="view-details-name" data-Id=' +
    element.Id +
    ">" +
    element.name +
    "</h3>";
  dynamicDiv =
    dynamicDiv +
    '<p class="view-details-email">Email: ' +
    element.email +
    "</p>";
  dynamicDiv =
    dynamicDiv +
    '<p class="view-details-mobile">Mobile: +91 ' +
    element.mobile +
    "</p>";
  dynamicDiv =
    dynamicDiv +
    '<p class="view-details-landline">Landline: 040 30 ' +
    element.landline +
    "</p>";
  dynamicDiv =
    dynamicDiv +
    '<p class="view-details-website">Website: ' +
    element.website +
    "</p>";
  dynamicDiv =
    dynamicDiv +
    '<p class="view-details-address" >Address: ' +
    element.address +
    "</p>";
  dynamicDiv = dynamicDiv + "</div>";
  dynamicDiv = dynamicDiv + '<div class = "view-detials-image">';
  dynamicDiv =
    dynamicDiv +
    '<img src="./../Images/edit-icon/Edit-icon.png" alt="edit-icon" class="view-details-edit"><span class="edit">EDIT</span>';
  dynamicDiv =
    dynamicDiv +
    '<img src="./../Images/delete-icon/delete1.png" alt="delete-icon" class="view-details-delete"><span class="delete">DELETE</span>';
  dynamicDiv = dynamicDiv + "</div>";
  $(".show-data").append(dynamicDiv);
}

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
        dynamicDiv + "<p class = 'fullMobile'>+91 " + element.mobile + "</p>";
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

function clearError() {
  $(".check-name").hide();
  $(".check-email").hide();
  $(".check-mobile").hide();
  $(".check-landline").hide();
  $(".check-website").hide();
  $(".check-address").hide();
}

function validate() {
  // Name Validation
  function Name_validation() {
    let name_err = true;
    let name_val = $("#txt-name").val();
    if (name_val.length < 3 && name_val != "") {
      $(".check-name").show();
      $(".check-name").html("**Name length must be greater than 3");
      $(".check-name").focus();
      $(".check-name").css("color", "red");
      name_err = false;
    } else {
      $(".check-name").hide();
      name_err = true;
    }
    return name_err;
  }

  // Email Validation
  function Email_validation() {
    let email_err = true;
    let email_val = $("#txt-email").val();
    if (!validEmail(email_val) && email_val != "") {
      $(".check-email").show();
      $(".check-email").html("**Enter a valid email");
      $(".check-email").focus();
      $(".check-email").css("color", "red");
      email_err = false;
    } else {
      $(".check-email").hide();
      email_err = true;
    }
    function validEmail(email) {
      var EmailRegex =
        /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,3})+$/;
      return EmailRegex.test(email);
    }
    return email_err;
  }

  // Mobile validation
  function Mobile_validation() {
    let mobile_err = true;
    let mobile_val = $("#txt-mobile").val();
    if (!validMobile(mobile_val) && mobile_val != "") {
      $(".check-mobile").show();
      $(".check-mobile").html("**Enter a valid mobile number");
      $(".check-mobile").focus();
      $(".check-mobile").css("color", "red");
      mobile_err = false;
    } else {
      $(".check-mobile").hide();
      mobile_err = true;
    }
    function validMobile(mobile) {
      var MobileRegex = /^(0|91)?[6-9][0-9]{9}$/;
      return MobileRegex.test(mobile);
    }
    return mobile_err;
  }

  // Landline validation
  function Landline_validation() {
    let landline_err = true;
    let landline_val = $("#txt-landline").val();
    if (!validLandline(landline_val) && landline_val != "") {
      $(".check-landline").show();
      $(".check-landline").html("**Enter a valid landline number");
      $(".check-landline").focus();
      $(".check-landline").css("color", "red");
      landline_err = false;
    } else {
      $(".check-landline").hide();
      landline_err = true;
    }
    function validLandline(landline) {
      var LandlineRegex = /^\d{7}$/;
      return LandlineRegex.test(landline);
    }
    return landline_err;
  }

  // Website Validation
  function Website_validation() {
    let website_err = true;
    let website_val = $("#txt-website").val();
    if (!validWebsite(website_val) && website_val != "") {
      $(".check-website").show();
      $(".check-website").html("**Enter a valid website");
      $(".check-website").focus();
      $(".check-website").css("color", "red");
      website_err = false;
    } else {
      $(".check-website").hide();
      website_err = true;
    }
    function validWebsite(website) {
      var WebsiteRegex =
        /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
      return WebsiteRegex.test(website);
    }
    return website_err;
  }

  // Address Validation
  function Address_validation() {
    let address_err = true;
    let address_val = $("#txt-address").val();
    if (address_val.length < 10 && address_val != "") {
      $(".check-address").show();
      $(".check-address").html("**Address length must be greater than 10");
      $(".check-address").focus();
      $(".check-address").css("color", "red");
      address_err = false;
    } else {
      $(".check-address").hide();
      address_err = true;
    }
    return address_err;
  }
  let nameValidation = Name_validation();
  let emailValidation = Email_validation();
  let mobileValidation = Mobile_validation();
  let landlineValidation = Landline_validation();
  let websiteValidation = Website_validation();
  let addressValidation = Address_validation();
  if (
    nameValidation == true &&
    emailValidation == true &&
    mobileValidation == true &&
    landlineValidation == true &&
    websiteValidation == true &&
    addressValidation == true
  ) {
    return true;
  } else {
    return false;
  }
}
