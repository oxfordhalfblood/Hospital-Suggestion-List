

$('.list-group-item').on('click',function(e) {
    e.preventDefault();
    $('.list-group-item').removeClass('active');
    $(this).addClass('active');
    let illness = $(this).text()  //pass this
    //alert("You selected" + $(this).text());  //gives illness name
});

$('.btn-link').on('click',function(e) {
    e.preventDefault();
    $('.btn-link').removeClass('active');
    $(this).addClass('active');
    let illness = $(this).text()  //pass this
    //alert("You selected" + $(this).text());  //gives illness name
});

$(document).ready(function(){
    $('#myselect').hide().after("<ul class='list-group'></ul>");

    $('#myselect option').each(function(){
          $('.list-group').append("<li class='list-group-item' opt='"+$(this).text()+"'>"+$(this).html()+"</li>"); 
    });

    $('.list-group li').on('click', function(){
        $(this).toggleClass('active');
        var allVal = new Array();
        $('.list-group li.active').each(function(){
             allVal.push(  $(this).attr('opt' ) );
        });
        $('#myselect').val(allVal);
    });
});

function getOption() { 
    selectElement =  document.querySelector('#select1'); 
              
    output = selectElement.value;   // getting severity level
    dwnindex = $("#select1").prop('selectedIndex');      // pass this
    //alert($("#select1").prop('selectedIndex'));
    var val = selectElement.options[selectElement.selectedIndex].text;
    

    // document.querySelector('.output').textContent 
    //         = val; 
    document.querySelector('.output').textContent = dwnindex; 
    event.preventDefault();
    return false;
} 

function formSubmit() {
    document.forms["myForm"].submit();
    console.log('submitted');
}

// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;


// function test(){
//         var header = document.getElementById("myDIV");

//         var btns = header.getElementsByClassName("list-group");

//         for (var i = 0; i < btns.length; i++) {
//                 btns[i].addEventListener("click", function() {
//                 var current = document.getElementsByClassName("active");
//                 if (current.length > 0) { 
//                 current[0].className = current[0].className.replace(" active", "");
//                 }
//                 this.className += " active";
//                 });
//         }
// }

// function myfunction($this,  $alias) {
//     console.log($this.text());  // Will log Paris | France | etc...

//     console.log($alias);  // Will output whatever is in data-alias=""
// }


//   $("#boundOnPageLoaded" ).click(function() {
//     console.log("boundOnPageLoaded Button Clicked")
//     });
    
//     $( "#removeButton" ).click(function() {
//     $("#boundOnPageLoaded").remove();
//     });
    
//     $( "#addButton" ).click(function() {
//     $("#container").html('<button id="boundOnPageLoaded">Click Me</button>');
//     });

//     document.getElementById('submit').onclick = () => {
//         const select = document.querySelector("select[name='monthofbirth']")
//         const value = select.value;
//         const option = select.querySelector(`option[value='${value}']`)
//         const text = option.innerText
//         console.log(text)
//       }

     


//     input = document.querySelector('input[type="submit"]');
