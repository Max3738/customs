let editer = document.querySelector("section");
let edit_inputs = document.querySelectorAll(".edit-custom");

let select = document.querySelector(".header");




editer.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-pencil-square-o")) {
        e.target.nextElementSibling.style.display = "block";
        e.target.className = "fa fa-check";

    } else if (e.target.classList.contains("fa-check")) {
        let form = e.target.nextElementSibling;
        let value_of_end_time = form.elements[0].value;
        let value_of_start_time = form.elements[1].value;
        let prev = e.target.previousElementSibling;
        if (value_of_end_time > value_of_start_time) {

            prev.innerText = `${value_of_end_time}`;
            prev.previousElementSibling.innerText = `${value_of_start_time}`;


            let id_seacher = e.target.parentElement.parentElement.parentElement;
            mydate1(id_seacher);

        } else {
            swal("Некорректный временный интервал!");
        }


        e.target.nextElementSibling.style.display = "none";
        e.target.className = "fa fa-pencil-square-o";
    } else if (e.target.classList.contains("fa-times")) {
        let target_parent = e.target.parentElement;
        target_parent.remove();



    } else if (e.target.classList.contains("card-header")) {
        e.target.parentElement.remove();
    }

});




function mydate() {
    d = new Date(document.getElementById("date-time-to-add").value);
    dt = d.getDate();
    mn = d.getMonth();
    mn++;
    yy = d.getFullYear();
    if (mn < 10 && dt < 10) {
        document.getElementById("ndt").value = "0" + dt + "." + "0" + mn + "." + yy;
    } else if (dt < 10) {
        document.getElementById("ndt").value = "0" + dt + "." + mn + "." + yy;
    } else if (mn < 10) {
        document.getElementById("ndt").value = dt + "." + "0" + mn + "." + yy;
    } else {
        document.getElementById("ndt").value = dt + "." + mn + "." + yy;
    }

}

function mydate1(card) {
    var is_wrong_time = false;
    var end = card.querySelectorAll(".end-time");
    var arr_max_times = [];
    var arr_min_times = [];

    var start = card.getElementsByClassName("start-time");
    for (let i = 0; i < start.length; i++) {
        let newEnd = end[i].textContent.slice(0, 2);
        arr_max_times.push(newEnd);

        let newStart = start[i].textContent.slice(0, 2);
        arr_min_times.push(newStart);

    }


    for (let i = 0; i <= arr_max_times.length - 1; i++) {
        for (let j = 1; j <= arr_max_times.length - 1; j++) {

            if (arr_min_times[i] < arr_max_times[j] && i != j) {
                is_wrong_time = true;
            }


        }

    }


    if (is_wrong_time == true) swal("Время пересекается!Поправьте список.");




}




function sortCards() {
    var x = document.getElementById("mySelect").selectedIndex;
    alert(document.getElementsByTagName("option")[x].value);
}

let card_header = document.getElementsByClassName("card-header");
let custom = document.getElementsByClassName("custom");
let button = document.querySelector(".btn");
button.addEventListener("click", handlerButton);

function handlerButton() {
    var date_time_to_add = document.getElementById("ndt").value;
    var id_seacher = document.getElementById(`d-${date_time_to_add}`);
    let custom = document.getElementsByClassName("custom");
    let custom_list = document.querySelector(".custom-list");

    var date_list = document.querySelector(".date-list");




    if (id_seacher !== null) {
        mydate1(id_seacher);
        var card_body = id_seacher.children[1];
    }
    var name_to_add = document.getElementById("name-to-add").value;
    let start_time_to_add = document.getElementById("start-time-to-add").value;
    let end_time_to_add = document.getElementById("end-time-to-add").value;
    let time1 = start_time_to_add;
    let time2 = end_time_to_add;
    let time1Date = new Date("01/01/2000 " + time1);
    let time2Date = new Date("01/01/2000 " + time2);
    if (time2Date > time1Date && start_time_to_add != "" && end_time_to_add != "" && date_time_to_add != "" && name_to_add != "") {
        if (id_seacher) {
            var have_place_to_be = false;
            for (let i = 0; i <= custom.length - 1; i++) {
                if (name_to_add == custom[i].textContent) {
                    have_place_to_be = true;
                }
            }


            if (have_place_to_be == false) {
                let template_custom = ` <div class="added-custom">
<p class="custom">${name_to_add}</p>
<p class="start-time">${start_time_to_add}</p>

<p class="end-time">${end_time_to_add}</p>
<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
<form class="edit-custom">
      <input type="text" class="hidden-form-right" value="00:00" min="08:00" max="21:00">
      <input type="text" class="hidden-form-left" value="${start_time_to_add}" min="08:00" max="21:00">
    

</form>
<i class="fa fa-times" aria-hidden="true"></i>
</div>
`
                card_body.insertAdjacentHTML("beforeend", template_custom);
                date_list.insertAdjacentHTML("beforeend", `<option value="${date_time_to_add}">${date_time_to_add}<option>`);


            } else {
                swal("Такая задача уже существует!");
            }
        } else {

            let template_card = `           <div class="card  mt-3 " style="width: 22rem;" id="d-${date_time_to_add}">
            <div class="card-header">${date_time_to_add}</div>
            <div class="card-body text-dark">
               <div class="added-custom">
                  <p class="custom">${name_to_add}</p>
                  <p class="start-time">${start_time_to_add}</p>
                 
                  <p class="end-time">${end_time_to_add}</p>
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  <form class="edit-custom">
                        <input type="text" class="hidden-form-right" value="00:00" min="08:00" max="21:00">
                        <input type="text" class="hidden-form-left" value="${start_time_to_add}" min="08:00" max="21:00">
                    
            
                  </form>
                  <i class="fa fa-times" aria-hidden="true"></i>
               </div>
            </div>


            `


            custom_list.insertAdjacentHTML("beforeend", template_card);
            date_list.insertAdjacentHTML("beforeend", `<option class="${date_time_to_add}">${date_time_to_add}<option>`);
        }
    } else {
        swal("Вы что-то не ввели или неправильно указали часовой диапазон!");
    }
}