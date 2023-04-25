import { showData } from "./script.js";

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
        showData(element);
      }
    }
  }

  deleteData(Id) {
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
