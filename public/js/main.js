const toggleButton = document.getElementById('modo-toggle');
let isDarkMode = false;

toggleButton.addEventListener('click', toggleMode);
function toggleMode() {
    if (isDarkMode) {
        document.body.classList.remove('dark-mode');
        isDarkMode = false;
    } else {
        document.body.classList.add('dark-mode');
        isDarkMode = true;
    }
}