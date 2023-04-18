$(document).ready(function () {
    // $('.name-check').hide();
    // $('.email-check').hide();
    // $('.mobile-check').hide();
    // $('.landline-check').hide();
    // $('.website-check').hide();
    // $('.address-check').hide();
    loadData();
    $('.add-btn').css('background', 'lightgreen');
    $('.add-popup').click(function () {
        $('.details').css('display', 'block');
        $('.show-data').css('display', 'none');
        clearForm();
        $("#txt-Id").val("");
        $('.add-btn').text("Add");
    })

    $('.close-btn').click(function () {
        $('.details').css('display', 'none');
        $('.show-data').css('display', 'flex');
    })

    $('.add-btn').click(function () {
 
        if ($('#txt-Id').val() == '') {
            addData();
        }
        else {
            updateData();
        }
    });

    $('.show-data').on('click', '.delete', function () {
        const cnf = confirm("Are you sure you want to delete this data?");
        if (cnf == true) {
            const id = $(this).parent().parent().find('.view-details-name').attr('data-id');
            deleteData(id);
        } else {
            loadData();
        }
        location.reload();
    });

    $('.showDetails').click(function () {
        const id = $(this).find('.fullName').attr('data-id');
        showData(id);
        $('.details').css('display', 'none');
        $('.show-data').css('display', 'flex');
    })

    $('.show-data').on('click', '.edit', function () {
        // debugger;
        const name = $(this).parent().parent().find('.view-details-name').html();
        const email = $(this).parent().parent().find('.view-details-email').html().slice(7);
        const mobile = $(this).parent().parent().find('.view-details-mobile').html().slice(12);
        const landline = $(this).parent().parent().find('.view-details-landline').html().slice(14);
        const website = $(this).parent().parent().find('.view-details-website').html().slice(9);
        const address = $(this).parent().parent().find('.view-details-address').html().slice(9);
        const id = $(this).parent().parent().find('.view-details-name').attr('data-id');

        $('#txt-name').val(name);
        $('#txt-email').val(email);
        $('#txt-mobile').val(mobile);
        $('#txt-landline').val(landline);
        $('#txt-website').val(website);
        $('#txt-address').val(address);
        $("#txt-Id").val(id);
        $('.add-btn').text("Update");
        $('.details').css('display', 'block');
        $('.show-data').css('display', 'none');
    })

    $('#user-details').keyup(function () {
        // debugger;
        var addBtn = $('.add-btn');

        if (($('#txt-name').val().trim() != "") && ($('#txt-email').val().trim() != "") && ($('#txt-mobile').val().trim() != "") && ($('#txt-landline').val().trim() != "") && ($('#txt-website').val().trim() != "") && ($('#txt-address').val().trim() != "")) {
            addBtn.removeAttr("disabled");
            $('.add-btn').css('background', 'green');
        } else {
            addBtn.attr("disabled", "disabled");
        }
    });

});

function addData() {
    let localData = localStorage.getItem('localData');
    if (localData) {
        let localArray = JSON.parse(localData);
        const obj = {
            id: localArray.length + 1,
            name: $('#txt-name').val(),
            email: $('#txt-email').val(),
            mobile: $('#txt-mobile').val(),
            landline: $('#txt-landline').val(),
            website: $('#txt-website').val(),
            address: $('#txt-address').val()
        };
        localArray.push(obj);
        localStorage.setItem('localData', JSON.stringify(localArray));
        loadData();
    } else {
        const arrayObj = [];
        const obj = {
            id: 1,
            name: $('#txt-name').val(),
            email: $('#txt-email').val(),
            mobile: $('#txt-mobile').val(),
            landline: $('#txt-landline').val(),
            website: $('#txt-website').val(),
            address: $('#txt-address').val()
        };
        arrayObj.push(obj);
        localStorage.setItem('localData', JSON.stringify(arrayObj));
        loadData();
    }
    clearForm();
    // location.reload();
}

function loadData() {
    let localData = localStorage.getItem('localData');
    if (loadData) {
        $('.contacts-list').html("");
        let localArray = JSON.parse(localData);
        let index = 1;
        localArray.forEach(element => {
            let dynamicDiv = '<div class="showDetails">';
            dynamicDiv = dynamicDiv + "<h3 class = 'fullName' data-id=" + element.id + ">" + element.name + "</h3>";
            dynamicDiv = dynamicDiv + "<p class = 'fullEmail'>" + element.email + "</p>";
            dynamicDiv = dynamicDiv + "<p class = 'fullMobile'>" + element.mobile + "</p>";
            $('.contacts-list').append(dynamicDiv);
            index++;
        });
    }
}

function clearForm() {
    $('#txt-name').val("");
    $('#txt-email').val("");
    $('#txt-mobile').val("");
    $('#txt-landline').val("");
    $('#txt-website').val("");
    $('#txt-address').val("");
}

function deleteData(id) {
    // debugger;
    let localData = localStorage.getItem('localData');
    let localArray = JSON.parse(localData);
    let i = 0;
    while (i < localArray.length) {
        if (localArray[i].id === Number(id)) {
            localArray.splice(i, 1);
        } else {
            ++i;
        }
    }
    localStorage.setItem('localData', JSON.stringify(localArray));
    // loadData();
}

function showData(id) {
    // debugger;
    let localData = localStorage.getItem('localData');
    let localArray = JSON.parse(localData);
    for (let i = 0; i < localArray.length; i++) {
        if (localArray[i].id === Number(id)) {
            $('.show-data').html("");
            let dynamicDiv = '<div class = "view-details">';
            dynamicDiv = dynamicDiv + '<h3 class="view-details-name" data-id=' + localArray[i].id + '>' + localArray[i].name + '</h3>';
            dynamicDiv = dynamicDiv + '<p class="view-details-email">Email: ' + localArray[i].email + '</p>';
            dynamicDiv = dynamicDiv + '<p class="view-details-mobile">Mobile: +91 ' + localArray[i].mobile + '</p>';
            dynamicDiv = dynamicDiv + '<p class="view-details-landline">Landline: 040 ' + localArray[i].landline + '</p>';
            dynamicDiv = dynamicDiv + '<p class="view-details-website">Website: ' + localArray[i].website + '</p>';
            dynamicDiv = dynamicDiv + '<p class="view-details-address" >Address: ' + localArray[i].address + '</p>';
            dynamicDiv = dynamicDiv + '</div>'
            dynamicDiv = dynamicDiv + '<div class = "view-detials-image">'
            dynamicDiv = dynamicDiv + '<img src="./../Images/edit-icon/Edit-icon.png" alt="edit-icon" class="view-details-edit"><span class="edit">EDIT</span>'
            dynamicDiv = dynamicDiv + '<img src="./../Images/delete-icon/delete1.png" alt="delete-icon" class="view-details-delete"><span class="delete">DELETE</span>'
            dynamicDiv = dynamicDiv + '</div>'
            $('.show-data').append(dynamicDiv);
        }
    }
}

function updateData() {

    let localData = localStorage.getItem('localData');
    let localArray = JSON.parse(localData);
    const oldRecord = localArray.find(m => m.id == $("#txt-Id").val());
    oldRecord.name = $('#txt-name').val();
    oldRecord.email = $('#txt-email').val();
    oldRecord.mobile = $('#txt-mobile').val();
    oldRecord.landline = $('#txt-landline').val();
    oldRecord.website = $('#txt-website').val();
    oldRecord.address = $('#txt-address').val();
    localStorage.setItem('localData', JSON.stringify(localArray));
    loadData();
    clearForm();
    location.reload();
}

function validate() {
    // Name validation
    function Name_validation() {
        let name_err = true;
        let name_val = $("#txt-name").val();
        if (name_val.length == '') {
            $('.name-check').show();
            $('.name-check').html('**Please fill the name');
            $('.name-check').focus();
            $('.name-check').css("color", "red");
            name_err = false;
            return name_err;
        } else {
            $('.name-check').hide();
        }

        if (name_val.length > 3) {
            $('.name-check').show();
            $('.name-check').html('**Name length must be greater than 3');
            $('.name-check').focus();
            $('.name-check').css("color", "red");
            name_err = false;
            return name_err;
        } else {
            $('.name-check').hide();
        }
        return name_err;
    }

    // Email Validation
    function Email_validation() {
        let email_err = true;
        let email_val = $("#txt-email").val();
        if (email_val.length == '') {
            $('.email-check').show();
            $('.email-check').html('**Please fill the email');
            $('.email-check').focus();
            $('.email-check').css("color", "red");
            email_err = false;
            return email_err;
        } else if (!validEmail(email_val)) {
            $('.email-check').show();
            $('.email-check').html('**Enter a valid email');
            $('.email-check').focus();
            $('.email-check').css("color", "red");
            name_err = false;
            return email_err;
        } else {
            $('.email-check').hide();
        }
        function validEmail(email) {
            var EmailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return EmailRegex.test(email);
        }
        return email_err;
    }

    // Mobile validation
    function Mobile_validation() {
        let mobile_err = true;
        let mobile_val = $("#txt-mobile").val();
        if (mobile_val.length == '') {
            $('.mobile-check').show();
            $('.mobile-check').html('**Please fill the mobile');
            $('.mobile-check').focus();
            $('.mobile-check').css("color", "red");
            mobile_err = false;
            return mobile_err;
        } else if (!validMobile(mobile_val)) {
            $('.mobile-check').show();
            $('.mobile-check').html('**Enter a valid mobile number');
            $('.mobile-check').focus();
            $('.mobile-check').css("color", "red");
            mobile_err = false;
            return mobile_err;
        } else {
            $('.mobile-check').hide();
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
        if (landline_val.length == '') {
            $('.landline-check').show();
            $('.landline-check').html('**Please fill the landline number');
            $('.landline-check').focus();
            $('.landline-check').css("color", "red");
            landline_err = false;
            return landline_err;
        } else if (!validLandline(landline_val)) {
            $('.landline-check').show();
            $('.landline-check').html('**Enter a valid landline number');
            $('.landline-check').focus();
            $('.landline-check').css("color", "red");
            landline_err = false;
            return landline_err;
        } else {
            $('.landline-check').hide();
        }
        function validLandline(landline) {
            var LandlineRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/;
            return LandlineRegex.test(landline);
        }
        return landline_err;
    }

    // Website Validation
    function Website_validation() {
        let website_err = true;
        let website_val = $("#txt-website").val();
        if (website_val.length == '') {
            $('.website-check').show();
            $('.website-check').html('**Please fill the website');
            $('.website-check').focus();
            $('.website-check').css("color", "red");
            website_err = false;
            return website_err;
        } else if (!validWebsite(website_val)) {
            $('.website-check').show();
            $('.website-check').html('**Enter a valid website');
            $('.website-check').focus();
            $('.website-check').css("color", "red");
            website_err = false;
            return website_err;
        } else {
            $('.website-check').hide();
        }
        function validWebsite(website) {
            var WebsiteRegex = /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
            return WebsiteRegex.test(website);
        }
        return website_err;
    }

    // Address Validation
    function Address_validation() {
        let address_err = true;
        let address_val = $("#txt-address").val();
        if (address_val.length == '') {
            $('.address-check').show();
            $('.address-check').html('**Please fill the address');
            $('.address-check').focus();
            $('.address-check').css("color", "red");
            address_err = false;
            return address_err;
        } else {
            $('.address-check').hide();
        }

        if (address_val.length > 10) {
            $('.address-check').show();
            $('.address-check').html('**Address length must be greater than 10');
            $('.address-check').focus();
            $('.address-check').css("color", "red");
            address_err = false;
            return address_err;
        } else {
            $('.address-check').hide();
        }
        return address_err;
    }
    if (!Name_validation() && !Email_validation() && !Mobile_validation() && !Landline_validation() && !Website_validation() && !Address_validation()) {
        return true;
    }
    else {
        return false;
    }
}