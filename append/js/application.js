$(document).ready(function () {

    var newList = `<div class="app"><h6>Lorem ipsum.</h6></div>`;

    $(".add_app>button").click(function () {

        $("#Wrap>.inner").append(newList);
        console.log('hi');

    });

})