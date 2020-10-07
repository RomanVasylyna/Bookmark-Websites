$(document).ready(() => {


//If Storage is Empty - Set Item
if(localStorage.length < 1) localStorage.setItem('websites', JSON.stringify([]));

//Get Current Year
$('.currentYear').text(() => new Date().getFullYear());

//Items remain even after page reload
saveInfo();
delWebsite();


//Form Event
$('#submit').on('click', function() {

//Regex to check for correct url
let regex = new RegExp('(http:\/\/|https:\/\/)[a-z]+\.[a-z]{2,3}', 'g');


//If Both Fields Are Empty - Error
if($('#websiteName').val() == '' && $('#websiteUrl').val() == '') {
alert('Fields Cannot Be Empty!');
}

//If One of the fields is empty - Error
else if($('#websiteName').val() == '' || $('#websiteUrl').val() == '') {
alert('One Field Is Empty!');
}

//If url != regex - Error
else if(!$('#websiteUrl').val().match(regex)) {
alert('Incorrect URL');
}

//Create Bookmark
else {
  addWebsite($('#websiteName').val(), $('#websiteUrl').val());
  delWebsite();
}


});


//Create Content
function addWebsite(name, url) {
let display = '';

display += `
<div class="card bg-secondary p-4 mb-3">
<div id="finalBookmark" class="d-flex flex-row">
  <h3 id="name">${name}</h3>
  <a class="btn btn-light ml-3 px-3" href="${url}" target="_blank">Visit</a>
  <a class="btn btn-danger ml-2 px-3" id="del">Delete</a>
</div>
</div>
`;

//Push Website To Local Storage
pushtoStorage(name, url);

$('#display .container').append(display);
clearFields();
}

  //Add Item to Local Storage
function pushtoStorage(name, url) {
  let arr = JSON.parse(localStorage.getItem('websites'));
  let obj = {};
  obj.website = name;
  obj.url = url;
  arr.push(obj);
  localStorage.setItem('websites', JSON.stringify(arr));
}


//Save Info
function saveInfo() {
if(localStorage !== null) {
  let arr = JSON.parse(localStorage.getItem('websites'));
  let display = '';

  arr.forEach(site => {
    display += `
    <div class="card bg-secondary p-4 mb-3">
    <div id="finalBookmark" class="d-flex flex-row">
      <h3 id="name">${site.website}</h3>
      <a class="btn btn-light ml-3 px-3" href="${site.url}" target="_blank">Visit</a>
      <a class="btn btn-danger ml-2 px-3" id="del">Delete</a>
    </div>
    </div>
    `;
  })

  $('#display .container').append(display);
}

}


//Deleting Website From The UI and LocalStorage
function delWebsite() {
  $('.card #del').on('click', function() {
  let arr = JSON.parse(localStorage.getItem('websites'));
  arr.forEach((site, index) => {
  if(site.website == $(this).closest('.card').find('#name').text()) {
  arr.splice(index, 1);
  }
  })
  $(this).closest('.card').remove();
  localStorage.setItem('websites', JSON.stringify(arr));
  });
}


//Clear Fields
function clearFields() {
$('input').val('');
}







































})
