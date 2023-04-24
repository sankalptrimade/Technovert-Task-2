export class Contact {
  Id;
  name;
  email;
  mobile;
  landline;
  website;
  address;
  constructor(args) {
    this.Id = args.Id;
    this.name = args.name;
    this.email = args.email;
    this.mobile = args.mobile;
    this.landline = args.landline;
    this.website = args.website;
    this.address = args.address;
  }
}

export class ContactService {
  add(Contact) {
    let localData = localStorage.getItem("localData");
    if (localData == null) {
      let array = [];
      array.push(Contact);
      localStorage.setItem("localData", JSON.stringify(array));
    } else {
      let localArray = JSON.parse(localData);
      localArray.push(Contact);
      localStorage.setItem("localData", JSON.stringify(localArray));
    }
  }

  getId() {
    let localData = localStorage.getItem("localData");
    let localArray = JSON.parse(localData);
    if (localArray.length >= 1) {
      return localArray[localArray.length - 1].Id + 1;
    } else {
      return 1;
    }
  }

  showData(Id) {
    let localData = localStorage.getItem("localData");
    let localArray = JSON.parse(localData);
    for (let i = 0; i < localArray.length; i++) {
      let element = localArray[i];
      if (element.Id === Number(Id)) {
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
    }
  }

  deleteData(Id) {
    // debugger;
    let localData = localStorage.getItem("localData");
    let localArray = JSON.parse(localData);
    let i = 0;
    while (i < localArray.length) {
      if (localArray[i].Id === Number(Id)) {
        localArray.splice(i, 1);
      } else {
        ++i;
      }
    }
    localStorage.setItem("localData", JSON.stringify(localArray));
    // loadData();
  }

  updateData(Contact) {
    let localData = localStorage.getItem("localData");
    let localArray = JSON.parse(localData);
    const contactObject = Contact;
    const oldRecord = localArray.find((m) => m.Id == contactObject.Id);
    oldRecord.name = contactObject.name;
    oldRecord.email = contactObject.email;
    oldRecord.mobile = contactObject.mobile;
    oldRecord.landline = contactObject.landline;
    oldRecord.website = contactObject.website;
    oldRecord.address = contactObject.address;
    localStorage.setItem("localData", JSON.stringify(localArray));
  }
}

