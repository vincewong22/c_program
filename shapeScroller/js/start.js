var id = [];
var level_shapes = [[], [], []], user_shapes = [[], [], []];

$(document).ready(function () {
//Set all elements with init id with block class drag enabled
    init();
//button that checks the
    $( "#click" ).click(function() {
        getListContent();
    });
//button that checks the
    $("#start_click").click(function () {
        level_shapes = getListContent();
        localStorage.setItem("level_shapes",level_shapes.toString());
        window.location.href = "input.html";
    });
    $("#input_click").click(function () {
        user_shapes = getListContent();
        //alert(document.cookie);

        var level_shapes_str = localStorage.getItem("level_shapes");
        if((user_shapes.toString()) == level_shapes_str)
            alert("match");
        else
            alert(level_shapes_str+" no match!");
    });

//gets the shapes from the 3 lists
    function getListContent() {
        var shapelist0 = [], shapelist1 = [], shapelist2 = [];
        var shapeArray = [shapelist0, shapelist1, shapelist2];
        for (i = 0; i < shapeArray.length; i++) {
            var target = "#shapelist" + i + " div";
            $(target).each(function () {
                if ($(this).hasClass("colorRed"))
                    myClass = "_red"
                if ($(this).hasClass("colorGreen"))
                    myClass = "_green"
                if ($(this).hasClass("colorBlue"))
                    myClass = "_blue"
                shapeArray[i].push(this.id + myClass);

            });

        }
        return shapeArray;
    }
    startTimer();
});//end of ready

function startTimer(){
    var countdown =  $("#countdown").countdown360({
        radius      : 60,
        seconds     : 10,
        fontColor   : '#FFFFFF',
        autostart   : false,
        onComplete : function() {window.location = "input.html"}
        <!--onComplete  : function() { console.log('done') } -->
    });
    countdown.start();
    console.log('countdown360 ',countdown);
}

function init(){
    $("#init .block").draggable({ helper: "clone",
        connectToSortable: ".list",
        drop: function (event, ui) {

        }
    });
    sortList();
}

function sortList(){
    //Connect empty sorted lists with draggable elements
    var removeIntent = false;
    $(".list").sortable({

        connectWith: ".list",
        receive: function(event,ui) {
            var id = ui.item.attr("id");
            console.log(id);
            if(id == "box")
                $(newItem).attr({style: "content:url(images/box.jpg)" });
            if(id == "triangle")
                $(newItem).attr({style: "content:url(images/triangle.jpg)" });
            if(id == "circle")
                $(newItem).attr({style: "content:url(images/circle.jpg)" });
            //check to see if your dragging out a new shape, if so, then give it a color, if check was not here
            //old shapes would have color overridden
            if(($(this).hasClass("colorBlue") ||$(this).hasClass("colorRed")||$(this).hasClass("colorGreen")))
                var colorClass = $("input:radio[name='color']:checked").val();
            $(newItem).addClass(colorClass);

        },
        beforeStop: function (event, ui) {
            console.log(removeIntent);
            newItem = ui.item;
        }
    });
}