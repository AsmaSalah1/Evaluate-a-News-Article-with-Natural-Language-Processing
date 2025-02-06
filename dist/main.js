
import { checkURL } from '../src/client/js/test/checkURL.test';
import { checkForm } from './src/client/js/test/checkForm.test';

(() => {
    "use strict";
  
    // دعم الأساليب
    const applyStyles = (styles) => {
      const styleElement = document.createElement('style');
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
    };
  
    // وظائف التحقق
    const checkForName = (name) => {
      console.log("::: Running checkForName :::", name);
      const validNames = ["Picard", "Janeway", "Kirk", "Archer", "Georgiou"];
      
      if (!validNames.includes(name)) {
          alert("Enter a valid captain name");
          return false; 
      }
  
      alert("Welcome, Captain!");
      return true; 
  };
  
  
function handleSubmit(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let url = document.getElementById('url').value;

    if (!checkForm(name, url)) {  
        return;
    }

    if (!checkForName(name)) {  
      return;  
  }
  
    if (!checkURL(url)) {  
        alert('الرجاء إدخال رابط صحيح');
        return;
    }

    console.log("::: Form Submitted :::");
    fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: JSON.stringify({ name: name, url: url }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('results').innerHTML = `Analysis: ${data.message}`;
    })
    .catch(error => console.error("Error:", error));
}

  
  
    // إعداد الاستماع للحدث
    const form = document.getElementById("urlForm");
    if (form) {
      form.addEventListener("submit", handleSubmit);
      window.handleSubmit = handleSubmit;
    }
  
    // تطبيق الأنماط
    const styleElements = [
      { id: 561, styles: `* { box-sizing: border-box; } ... /* Other global styles */` },
      { id: 348, styles: `body { display: flex; flex-direction: column; min-height: 100vh; } ...` },
      { id: 306, styles: `` },
      { id: 923, styles: `form { border: 1px solid #545454; border-radius: 3px; padding: 40px; } ...` },
      { id: 752, styles: `header { display: flex; justify-content: space-between; padding: 10px 40px; }` }
    ];
  
    styleElements.forEach(({ styles }) => applyStyles(styles));
  
    // رسائل التحقق
    console.log("Check function initialized");
    alert("I EXIST");
    console.log("CHANGE!!");
  })();
  