const style = document.createElement('style');
style.textContent = `
  .extension-container{
    position: fixed;
    right: 10px;
    bottom: 10px;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    z-index: 1000;
    border: 1px solid rgba(0, 0, 0, 0.1); /* More transparent border */
    gap: 10px;
    border-radius: 8px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.7); /* More transparent background */
  }

  .update-container {
    display: flex;
    gap: 10px;
  }

  .preview-trigger-button {
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid rgba(78, 148, 255, 0.4);  /* More transparent border */
    background-color: rgba(78, 148, 255, 0.6);  /* More transparent background */
    color: white;
    border-radius: 4px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .preview-trigger-button:hover {
    background-color: rgba(34, 98, 179, 0.7); /* More transparent hover */
    transform: scale(1.05); /* Slight zoom effect on hover */
  }

  .custom-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: rgba(45, 211, 122, 0.7);  /* More transparent background */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    opacity: 0.8; /* More transparency */
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .custom-button:hover {
    background-color: rgba(35, 168, 92, 0.7);  /* More transparent hover */
    transform: scale(1.05); /* Slight zoom effect on hover */
  }
`;


document.head.appendChild(style);


// Function to trigger the saveprdata button inside the iframe
function triggerSaveButton() {
    let myframe = document.getElementById('myframe');
    if (myframe && myframe.contentDocument) {
      let saveButton = myframe.contentDocument.getElementById('saveprdata');
      if (saveButton) {
        saveButton.click();
      } else {
        console.log('Save button not found inside iframe!');
      }
    } else {
      console.log('Iframe not found or not accessible!');
    }
  }

  function triggerClick(id) {
    let myframe = document.getElementById('myframe');
    if (myframe && myframe.contentDocument) {
        let targetElement = myframe.contentDocument.querySelector(`a[onclick^="vw1resume${id}("]`);
        if (targetElement) {
            targetElement.click();
        } else {
            console.warn(`Preview "${id}" not found inside iframe!`);
        }
    } else {
        console.log('Iframe not found or not accessible!');
    }
}


    let ex_container = document.createElement('div');
    ex_container.classList.add('extension-container');


  let container = document.createElement('div');
  container.classList.add('update-container');

  ['P 1', 'P 2', 'P 3'].forEach((text, index) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('preview-trigger-button');
    
    // Assign a unique ID for the target element to simulate the click
    button.addEventListener('click', () => triggerClick(index+1));
    container.appendChild(button);
  });

  document.body.appendChild(container);
  ex_container.appendChild(container);

  
  // Create the custom button
  let customButton = document.createElement('button');
  customButton.classList.add('custom-button')
  customButton.textContent = 'Update';

  
  // Append the custom button to the body
  ex_container.appendChild(customButton);
  document.body.appendChild(ex_container);
  
  // Add event listener to trigger the saveprdata button in the iframe
  customButton.addEventListener('click', function() {
    triggerSaveButton();
  });
  