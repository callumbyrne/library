const modal = document.querySelector("#modal");
const newBtn = document.querySelector("#newBtn");
const span = document.querySelector(".close");
const submitBtn = document.querySelector("#submitBtn");
const title = document.getElementById('title').value;

newBtn.addEventListener('click', () => {
    modal.style.display = "block";
});

span.addEventListener('click', () => {
    modal.style.display = "none";
});

submitBtn.addEventListener('click', () => {
    if (!title) {
        return;
    } else {
        modal.style.display = "none";
    };
})

window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}