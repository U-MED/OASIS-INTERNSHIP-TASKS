let inputDisplay = document.getElementById('inputDisplay');
        let resultDisplay = document.getElementById('resultDisplay');

        function append(value) {
            let lastChar = inputDisplay.textContent.slice(-1);
            let operators = ['+', '-', '*', '/'];
            
            // Prevent multiple consecutive operators
            if (operators.includes(lastChar) && operators.includes(value)) {
                return;
            }
        
            // Prevent multiple decimal points in a single number
            if (value === '.' && (lastChar === '.' || inputDisplay.textContent.split(/[\+\-\*\/]/).pop().includes('.'))) {
                return;
            }
        
            if (inputDisplay.textContent === '0' && !operators.includes(value)) {
                inputDisplay.textContent = value;
            } else {
                inputDisplay.textContent += value;
            }
        }
        
        

        function clearDisplay() {
            inputDisplay.textContent = '0';
            resultDisplay.textContent = '0';
        }

        function deleteLast() {
            inputDisplay.textContent = inputDisplay.textContent.slice(0, -1) || '0';
        }

        function toggleSign() {
            let currentValue = inputDisplay.textContent;
            if (currentValue === '0') return;
            if (currentValue[0] === '-') {
                inputDisplay.textContent = currentValue.slice(1);
            } else {
                inputDisplay.textContent = '-' + currentValue;
            }
        }

        function calculate() {
            try {
                let result = new Function('return ' + inputDisplay.textContent)();
                resultDisplay.textContent = result;
            } catch (e) {
                resultDisplay.textContent = 'Error';
            }
        }
        