export const flagAnimAdded = function (direction) {
    var flag = document.getElementById(`chosen-flag-${direction}`);
    flag.classList.add(`animate-${direction}`);
    setTimeout(function() {
        var flag = document.getElementById(`chosen-flag-${direction}`);
        flag.classList.remove(`animate-${direction}`);
    }, 500);
}