import hiCss from './css/hi.css';

console.log(hiCss)

export const sayHi = () =>{
   document.querySelector('#app').innerText = 'HiComponent Works!';
}

const element = document.querySelector(".element");

element.innerHTML = `
   <div class="${hiCss.page}">
     <p class="${hiCss.text}">CSS Modules Webpack</p>
   </div>
`;
