import store from '@/store'

const setTheme = (payload) => {
    let htmlElement = document.documentElement, selected;
    selected = (payload == 3) ? 'contrast'
             : (payload == 2) ? 'sepia'
             : (payload == 1) ? 'light'
             : 'dark';
    htmlElement.setAttribute('theme', selected);
    store.commit("setTheme",payload);
}

const setFontSize = (payload) => {
    let htmlElement = document.documentElement;
    htmlElement.style.fontSize = `${payload}rem`;
}

const loadStats = () => {
    console.log('load stats');
    if (localStorage.treinoStats) {
        let sg = JSON.parse(localStorage.treinoStats);
        store.commit("setStats",sg);
        store.commit("setTheme",sg.theme);
        console.log(sg);
    }
}

export { setTheme, setFontSize, loadStats }