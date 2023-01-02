let nCounter = 0;

class Win {
    constructor(title, url, w, h) {
        $('.windows').append("<div class='window' style='height:"+h+"px;width:"+w+"px;'data-n='" + String(nCounter) + "'>\
                <div class='titlebar'><button class='close-btn'>×</button><span class='title'>"+ title + "</span></div>\
                <webview class='view' src='"+url+"'></webview>\
            </div>");
        $('.taskbar').append("<button class='task' data-n='" + String(nCounter) + "'>\
            "+ title + "\
            </button>");
        this.that = $("div[data-n='" + String(nCounter) + "']");
        dragElement(this.that.children()[0]);
        this.closeBtn = $("div[data-n='" + String(nCounter) + "']>.titlebar>.close-btn");
        this.closeBtn.on("click", function () {
            close()
        });
        this.that.on('mouseover', function () {
            $(".window").removeClass("active");
            this.classList.add('active');
        });
        this.that.on('mouseout', function () {
            $(".window").removeClass("active");
            this.classList.remove('active');
        });
        $("button[data-n='"+String(nCounter)+"']").on('click', function () {
            $(".window").removeClass("active");
            $("div[data-n='" + $(this).attr('data-n') + "']").addClass("active");
        })
        this.that.resizable({
            handleSelector: ".splitter"
        });
        $(".resizable-t, .resizable-l").hide();
        nCounter += 1;
    }
}
function close () { 
    that = document.activeElement;
    n = that.parentElement.parentElement.getAttribute("data-n");
    $("button[data-n='"+n+"']")[0].remove();
    that.parentElement.parentElement.remove();
}
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        // e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.parentElement.style.top = (elmnt.parentElement.offsetTop - pos2) + "px";
        elmnt.parentElement.style.left = (elmnt.parentElement.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

$(".windows").on("click",function () {
    $(".launcher").hide();
})

// win = new Win("Timer","apps.d/timer.html");
// win2 = new Win("Discord","https://www.discord.com/app/");

$('.quote').html(quotes[Math.floor(Math.random() * 31)]);

function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

var now = new Date();
var strDateTime = [[AddZero(now.getDate()),
AddZero(now.getMonth() + 1),
now.getFullYear()].join("/"),
[AddZero(now.getHours()),
AddZero(now.getMinutes())].join(":"),
now.getHours() >= 12 ? "PM" : "AM"].join(" ");
$(".time").html(strDateTime)

setInterval(() => {
    var strDateTime = [[AddZero(now.getDate()),
    AddZero(now.getMonth() + 1),
    now.getFullYear()].join("/"),
    [AddZero(now.getHours()),
    AddZero(now.getMinutes())].join(":"),
    now.getHours() >= 12 ? "PM" : "AM"].join(" ");
    $(".time").html(strDateTime)
}, 60000);

function openPopUp(){
    $(".launcher").show();
    $(".search").focus()
}
$(".launcher-item").on('click', function () {
    url = $(this).attr("data-url");
    title = $(this).attr("data-title");
    w = $(this).attr("data-w");
    h = $(this).attr("data-h");
    new Win(title, url, w, h)
})

$(".search").on("keyup", function (e) {
    $("button.launcher-item").hide();
    $("button.launcher-item:contains('"+$(this).val()+"')").show();
    if (e.key == "Enter"){
        $("button.launcher-item:visible").trigger("click");
        $(".launcher").hide();
        $(".search").val("");
        $("button.launcher-item").show()
    }
})

$("body").on("keyup", (e)=>{
    switch (e.key) {
        case "Meta":
            if ($(".launcher").css("display") == "none"){
                openPopUp();
            }
            else{
                $(".launcher").hide();
                $(".search").val("");
            }
            break;
        
        case "Q":
            if (e.metaKey == true && e.shiftKey == true) {
                n = $(".active").attr("data-n");
                $(".active").remove();
                $("button[data-n='"+n+"']")[0].remove();
            }
            break;
    
        default:
            break;
    }
})