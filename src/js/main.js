(() => {
	let preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
	let preferTheme = (preferDark ? 'dark' : 'light');
	let theme = localStorage.getItem('theme');

	if (theme === null) {
		theme = preferTheme;
	};

	setTheme(theme);
})();

function setTheme(theme) {
	document.body.classList.toggle('body--theme-dark', (theme === 'dark'));
	let themeColors = {light: '#fff', dark: '#333333'};
	document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColors[theme]);
	document.querySelector('meta[name="color-scheme"]').setAttribute('content', theme);
	document.querySelector('.theme-toggle__input').toggleAttribute('checked', (theme === 'dark'));
	document.querySelector('.theme-toggle__label').setAttribute('title', `Click to change, ${theme} theme choiced`);

	localStorage.setItem('theme', theme);
};

window.onload = () => {
	document.getElementById('toggle').onchange = () => {
		let theme = localStorage.getItem('theme');
		setTheme((theme === 'dark' ? 'light' : 'dark'));
	};
};

document.documentElement.style.display = '';

const menu = document.querySelector('.menu');
const menuButton = document.querySelector('.menu__button');

menuButton.onclick = () => {
	menu.classList.toggle('menu--active');

	if (menu.getAttribute('class').includes('menu--active')) {
		menuButton.setAttribute('aria-expanded', 'true');
	} else {
		menuButton.setAttribute('aria-expanded', 'false');
	};
};