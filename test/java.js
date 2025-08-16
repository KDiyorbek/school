document.addEventListener('DOMContentLoaded', () => {
 const clearButton = document.getElementById('clear-button');
 const publishButton = document.getElementById('publish-button');
 const rotateButton = document.getElementById('rotate-button');
 const bgColorButton = document.getElementById('bg-color-button');
 const textColorButton = document.getElementById('text-color-button');
 const fontButton = document.getElementById('font-button');
 const symbolButton = document.getElementById('symbol-button');
 const sizeButton = document.getElementById('size-button');
 const patternButton = document.getElementById('pattern-button');
 const ribbonFront = document.getElementById('ribbon-front');
 const ribbonBack = document.getElementById('ribbon-back');
 const modelFront = document.getElementById('model-front');
 const modelBack = document.getElementById('model-back');
 const optionsPanel = document.getElementById('options-panel');

 let changesMade = false;
 let isFrontVisible = true;
 let currentColor = 'white';
 let currentBgColor = 'maroon';
 let currentFont = 'sans-serif';
 let currentSize = '1.5em';
 let currentPattern = '';

 const namedColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'black', 'white', 'maroon', 'navy'];
 const fontList = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Courier New', 'Verdana'];
 const symbolGrid = ['🎓', '⭐', '🎉', '✨', '🏅', '📜', '🔔', '🎗️', '🗓️', '💯'];
 const sizeList = ['1em', '1.2em', '1.5em', '1.8em', '2em'];
 const patternList = ['', 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)', 'repeating-radial-gradient(circle at 0 0, transparent 0, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)'];

 function showOptions(type, options) {
  optionsPanel.innerHTML = '';
  options.forEach(option => {
   const button = document.createElement('button');
   button.classList.add('option-button');
   button.textContent = option;
   button.value = option;
   button.addEventListener('click', () => {
    handleOptionClick(type, option);
    optionsPanel.classList.remove('show');
   });
   optionsPanel.appendChild(button);
  });
  optionsPanel.classList.add('show');
 }

 function handleOptionClick(type, value) {
  changesMade = true;
  publishButton.disabled = false;
  if (type === 'color') {
   if (document.activeElement === ribbonFront) {
    ribbonFront.style.color = value;
    currentColor = value;
   } else if (document.activeElement === ribbonBack) {
    ribbonBack.style.color = value;
    currentColor = value;
   }
  } else if (type === 'bgColor') {
   if (document.activeElement === ribbonFront) {
    ribbonFront.style.backgroundColor = value;
    currentBgColor = value;
   } else if (document.activeElement === ribbonBack) {
    ribbonBack.style.backgroundColor = value;
    currentBgColor = value;
   }
  } else if (type === 'font') {
   if (document.activeElement === ribbonFront) {
    ribbonFront.style.fontFamily = value;
    currentFont = value;
   } else if (document.activeElement === ribbonBack) {
    ribbonBack.style.fontFamily = value;
    currentFont = value;
   }
  } else if (type === 'symbol') {
   if (isFrontVisible) {
    ribbonFront.textContent += value;
   } else {
    ribbonBack.textContent += value;
   }
  } else if (type === 'size') {
   if (document.activeElement === ribbonFront) {
    ribbonFront.style.fontSize = value;
    currentSize = value;
   } else if (document.activeElement === ribbonBack) {
    ribbonBack.style.fontSize = value;
    currentSize = value;
   }
  } else if (type === 'pattern') {
   if (document.activeElement === ribbonFront) {
    ribbonFront.style.backgroundImage = value;
    currentPattern = value;
   } else if (document.activeElement === ribbonBack) {
    ribbonBack.style.backgroundImage = value;
    currentPattern = value;
   }
  }
 }

 clearButton.addEventListener('click', () => {
  ribbonFront.textContent = '';
  ribbonBack.textContent = '';
  ribbonFront.style.color = 'white';
  ribbonBack.style.color = 'white';
  ribbonFront.style.backgroundColor = 'maroon';
  ribbonBack.style.backgroundColor = 'maroon';
  ribbonFront.style.fontFamily = 'sans-serif';
  ribbonBack.style.fontFamily = 'sans-serif';
  ribbonFront.style.fontSize = '1.5em';
  ribbonBack.style.fontSize = '1.5em';
  ribbonFront.style.backgroundImage = '';
  ribbonBack.style.backgroundImage = '';
  currentColor = 'white';
  currentBgColor = 'maroon';
  currentFont = 'sans-serif';
  currentSize = '1.5em';
  currentPattern = '';
  changesMade = false;
  publishButton.disabled = true;
 });

 publishButton.addEventListener('click', () => {
  // In a real scenario, you would use a server-side script
  // or a library to generate an image and then trigger
  // the Android ShareSheet. This is client-side rendering
  // for demonstration.

  const canvas = document.createElement('canvas');
  const width = 500;
  const height = 800;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f4f4f4';
  ctx.fillRect(0, 0, width, height);

  // Basic rendering of the model and ribbon (simplified)
  ctx.fillStyle = '#ddd';
  ctx.fillRect(150, 50, 200, 400); // Model body
  ctx.fillStyle = 'white';
  ctx.fillRect(190, 100, 120, 150); // White top
  ctx.fillStyle = 'black';
  ctx.fillRect(150, 350, 200, 100); // Black bottom

  const ribbonTextFront = ribbonFront.textContent;
  const ribbonTextBack = ribbonBack.textContent;

  // Render front ribbon
  ctx.fillStyle = currentBgColor;
  ctx.fillRect(100, 150, 300, 80);
  ctx.font = `${currentSize} ${currentFont}`;
  ctx.fillStyle = currentColor;
  ctx.textAlign = 'center';
  ctx.translate(250, 190);
  ctx.rotate(-Math.PI / 9); // Adjust rotation to match CSS
  ctx.fillText(ribbonTextFront, 0, 0);
  ctx.rotate(Math.PI / 9);
  ctx.translate(-250, -190);
  ctx.textAlign = 'start';

  const imageUrl = canvas.toDataURL('image/png');
  alert('Publish functionality would generate an image and trigger share on Android.');

  // To actually trigger Android ShareSheet, you would typically:
  // 1. Send the image data to a server.
  // 2. The server would create a shareable link or use a native bridge.
  // 3. On Android (in a WebView), you might use JavaScript interfaces
  //    to call native Android sharing functions.
 });

 rotateButton.addEventListener('click', () => {
  isFrontVisible = !isFrontVisible;
  modelFront.style.display = isFrontVisible ? 'flex' : 'none';
  modelBack.style.display = isFrontVisible ? 'none' : 'flex';
 });

 bgColorButton.addEventListener('click', () => {
  showOptions('bgColor', namedColors);
 });

 textColorButton.addEventListener('click', () => {
  showOptions('color', namedColors);
 });

 fontButton.addEventListener('click', () => {
  showOptions('font', fontList);
 });

 symbolButton.addEventListener('click', () => {
  showOptions('symbol', symbolGrid);
 });

 sizeButton.addEventListener('click', () => {
  showOptions('size', sizeList);
 });

 patternButton.addEventListener('click', () => {
  showOptions('pattern', patternList);
 });

 document.addEventListener('click', (event) => {
  if (!event.target.closest('.options-panel') && !event.target.closest('.panel-button')) {
   optionsPanel.classList.remove('show');
  }
 });

 // Basic local storage for remembering changes (not per user)
 const savedFrontText = localStorage.getItem('ribbonFrontText');
 const savedBackColor = localStorage.getItem('ribbonBackColor');
 const savedTextColor = localStorage.getItem('ribbonTextColor');
 const savedFont = localStorage.getItem('ribbonFont');
 const savedSize = localStorage.getItem('ribbonSize');
 const savedPattern = localStorage.getItem('ribbonPattern');

 if (savedFrontText) ribbonFront.textContent = savedFrontText;
 if (savedBackColor) {
  ribbonFront.style.backgroundColor = savedBackColor;
  ribbonBack.style.backgroundColor = savedBackColor;
  currentBgColor = savedBackColor;
 }
 if (savedTextColor) {
  ribbonFront.style.color = savedTextColor;
  ribbonBack.style.color = savedTextColor;
  currentColor = savedTextColor;
 }
 if (savedFont) {
  ribbonFront.style.fontFamily = savedFont;
  ribbonBack.style.fontFamily = savedFont;
  currentFont = savedFont;
 }
 if (savedSize) {
  ribbonFront.style.fontSize = savedSize;
  ribbonBack.style.fontSize = savedSize;
  currentSize = savedSize;
 }
 if (savedPattern) {
  ribbonFront.style.backgroundImage = savedPattern;
  ribbonBack.style.backgroundImage = savedPattern;
  currentPattern = savedPattern;
 }

 ribbonFront.addEventListener('input', () => {
  localStorage.setItem('ribbonFrontText', ribbonFront.textContent);
  changesMade = true;
  publishButton.disabled = false;
 });

 ribbonBack.addEventListener('input', () => {
  localStorage.setItem('ribbonBackText', ribbonBack.textContent);
  changesMade = true;
  publishButton.disabled = false;
 });

 // Similarly, you would save other states to localStorage on change

 // For user-specific data and writing to a file or metadata,
 // you would need a backend server and potentially user authentication.
});