const api_url =
    "https://jsonplaceholder.typicode.com/users";






async function getapi(url) {


    const response = await fetch(url);


    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}
async function edt() {

    var alt = $('input[type=checkbox]:checked').attr('id');

    var splt = alt.split("_");

    //     fetch('https://jsonplaceholder.typicode.com/users/1')
    //   .then((response) => response.json())
    //   .then((json) => console.log(json))
    const res1 = await fetch('https://jsonplaceholder.typicode.com/users/' + splt[1]);


    var data = await res1.json();
    console.log(data["name"]);
    $("#name").val(data["name"]);
    $("#username").val(data["username"]);
    $("#email").val(data["email"]);
    $("#phone").val(data["phone"]);
    $("#website").val(data["website"]);
    $("#dialog-form1").dialog("open");

}
async function updateapi(url) {
}

getapi(api_url);


function OnSelect(cnt) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length == 1) {
        document.getElementById('edt').removeAttribute('disabled', true);
    }
    else {
        document.getElementById('edt').setAttribute('disabled', true);
    }
}
function dlt() {
   
    $.each($('input[type="checkbox"]:checked'), function(){
    //    alert(splt[1]);
    var alt =$(this).attr('id');
    var splt = alt.split("_");
    alert(splt[1]);
    fetch('https://jsonplaceholder.typicode.com/users/'+splt[1], {
              method: 'DELETE',
         })
    });
}


function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

function show(data) {


    document.getElementById('edt').setAttribute('disabled', true);
    var col = [];
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    console.log(col);
    var table = document.createElement("table"); 
    var tr = table.insertRow(-1);
    for (var i = 0; i < col.length; i++) {
        console.log('column', col[i]);
        if (col[i].toString() != 'address' && col[i].toString() != 'company') {
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);

        }
    }
    var th = document.createElement("th");
    th.innerHTML = 'Select';
    tr.appendChild(th);
    for (var i = 0; i < data.length; i++) {

        tr = table.insertRow(-1);

        var td = document.createElement("td");

        for (var j = 0; j < col.length; j++) {

            if (col[j].toString() != 'address' && col[j].toString() != 'company') {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i][col[j]];
            }
            td.innerHTML = `<input type="checkbox" name="chkrows" onchange='OnSelect(this);' id=chk_` + data[i][col[0]] + `>`;
            tr.appendChild(td);
        }
    }
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
} 
