const themeInitScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme') || 'system';
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = theme === 'dark' || theme === 'black' || (theme === 'system' && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
    if (theme === 'black') {
      document.documentElement.classList.add('black');
    } else {
      document.documentElement.classList.remove('black');
    }
  } catch (e) {
    document.documentElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
})();
`;

export default themeInitScript;
