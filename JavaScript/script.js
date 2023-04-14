var emptyDiv = '<div > No Records </div>';
$(document).ready(function () {
    loadData();
    $('.add-popup').click(function () {
        $('.details').css('display', 'block');
    })

    $('.close-btn').click(function(){
        $('.details').css('display', 'none');
    })

    $('.add-btn').click(function () {
        // debugger;
        if ($('#txt-Id').val() == '') {
            addData();
        } 
        // else {
        //     updateData();
        // }
    });

    // temporary delete.

    $('.delete-button').click(function(){
        // debugger;
        const id = $(this).parent().find('.fullName').attr('data-id');
        deleteData(id);
    })

});

function addData() {
    // debugger;
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
}

function loadData() {
    // debugger;
    let localData = localStorage.getItem('localData');
    if (loadData) {
        $('.contacts-list').html("");
        let localArray = JSON.parse(localData);
        let index = 1;
        localArray.forEach(element => {
            let dynamicDiv = '<div class="showDetails">';
            dynamicDiv = dynamicDiv + "<h3 class = 'fullName' data-id="+element.id+">" + element.name + "</h3>";
            dynamicDiv = dynamicDiv + "<p class = 'fullEmail'>" +element.email+ "</p>";
            dynamicDiv = dynamicDiv + "<p class = 'fullMobile'>" +element.mobile+ "</p>";
            dynamicDiv = dynamicDiv + "<button class = delete-button> Delete </button>"
            $('.contacts-list').append(dynamicDiv);
            index++;
        });
    }
    addEmptyDiv();
}

function clearForm(){
    $('#txt-name').val("");
    $('#txt-email').val("");
    $('#txt-mobile').val("");
    $('#txt-landline').val("");
    $('#txt-website').val("");
    $('#txt-address').val("");
}

function addEmptyDiv(){
    // debugger;
    if($('.contacts').children().length == 0) {
        $('.contacts .contacts-list').append(emptyDiv);
    }
}

function deleteData(id){
    // debugger;
    let localData = localStorage.getItem('localData');
    let localArray = JSON.parse(localData);
    let i = 0;
    while(i < localArray.length) {
        if(localArray[i].id === Number(id)) {
            localArray.splice(i,1);
        } else {
            ++i;
        }
    }
    localStorage.setItem('localData', JSON.stringify(localArray));
    loadData();
}
