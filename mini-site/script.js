window.onscroll = function () {
const btn = document.querySelector('.back-to-top’);
btn.style.display =
(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200)
? 'block'
: 'none’;
};