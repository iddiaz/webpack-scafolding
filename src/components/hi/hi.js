import styles from './css/hi.module.css';

console.log(styles)

export const sayHi = () =>{
   document.querySelector('#root').innerText = 'HiComponent Works!';
}

const element = document.querySelector(".element");

element.innerHTML = `
   <div class="${styles.page}">
     <p class="${styles.text}">CSS Modules Webpack</p>
   </div>
`;
