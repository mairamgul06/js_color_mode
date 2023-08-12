const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) =>{
    event.preventDefault();
    if(event.code.toLowerCase() === 'space'){
        setRandomColors();
    }
})
document.addEventListener('click', (event) =>{
    const type = event.target.dataset.type;
    if(type === 'lock'){
       const mode = event.target.tagName.toLowerCase() === 'i'
       ? event.target
       : event.target.children[0];

       mode.classList.toggle('fa-lock-open')
       mode.classList.toggle('fa-lock')
    } else if(type === 'title'){
        CopyColor(event.target.textContent);
        alert('Copied!')
    }

})

function CopyColor(text){
    return navigator.clipboard.writeText(text);
}

function setRandomColors() {
    const colors = [];
    cols.forEach((col) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('.title')
        const btn = col.querySelector('.btn')
        const color = chroma.random();

        if(isLocked){
            colors.push(text.textContent)
            return
        }
        colors.push(color);

        text.textContent = color;
        col.style.background = color

        TextColor(text,color);
        TextColor(btn,color);

    });
    
    HashColors(colors);
}
function TextColor(text, color) {
    const title = chroma(color).luminance();
    text.style.color = title > 0.5 ? 'black' : 'white'
}

function HashColors(colors = []){
document.location.hash = colors
.map((col) => {
    return col.toString().substring(1)}
    ).join('-')
}

setRandomColors();