function confirm_click() 
{
    var answer = prompt('Are you sure you want to see?  (yes/no)');
    return answer.toLowerCase() == 'yes';
}

function toggle_visibility(id)
{
    var element = document.getElementById(id);
    element.style.visibility =
        (element.style.visibility == "visible") ? "hidden" : "visible";
}

