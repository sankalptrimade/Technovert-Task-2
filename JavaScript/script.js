$(document).ready(function () {
    loadData();
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
        debugger;
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
            location.reload();
        } else{
            loadData();
            location.reload();
        }

    });

    $('.showDetails').click(function(){
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
    location.reload();
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
            dynamicDiv = dynamicDiv + '<p class="view-details-website">Website: '+localArray[i].website+'</p>';
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

