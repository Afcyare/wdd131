// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

   // Mobile menu functionality
const menuButton = document.getElementById('menu-button');
const mainNav = document.getElementById('main-nav');

if (menuButton && mainNav) {
    menuButton.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        mainNav.setAttribute('aria-expanded', !isExpanded);
        this.textContent = isExpanded ? '☰' : '✕';
        
        // Toggle mobile menu visibility
        if (!isExpanded) {
            mainNav.style.display = 'block';
            setTimeout(() => {
                mainNav.style.right = '0';
            }, 10);
        } else {
            mainNav.style.right = '-100%';
            setTimeout(() => {
                mainNav.style.display = 'none';
            }, 300);
        }
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && e.target !== menuButton && 
            window.getComputedStyle(mainNav).display === 'block') {
            menuButton.setAttribute('aria-expanded', 'false');
            mainNav.setAttribute('aria-expanded', 'false');
            menuButton.textContent = '☰';
            mainNav.style.right = '-100%';
            setTimeout(() => {
                mainNav.style.display = 'none';
            }, 300);
        }
    });
}

    // Water calculator form (on home page)
    const waterForm = document.getElementById('water-calculator');
    const resultDiv = document.getElementById('result');
    
    if (waterForm && resultDiv) {
        waterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const weight = parseFloat(document.getElementById('weight').value);
            const activityLevel = parseFloat(document.getElementById('activity').value);
            
            if (weight && activityLevel) {
                const waterNeeds = Math.round(weight * 35 * activityLevel);
                localStorage.setItem('waterNeeds', waterNeeds);
                
                resultDiv.innerHTML = `
                    <p>Your recommended daily water intake: <strong>${waterNeeds}ml</strong></p>
                    <a href="tracker.html" class="cta-button">Start Tracking</a>
                `;
                resultDiv.classList.remove('hidden');
            }
        });

        // Check for existing water needs
        const savedNeeds = localStorage.getItem('waterNeeds');
        if (savedNeeds) {
            resultDiv.innerHTML = `
                <p>Your current daily goal: <strong>${savedNeeds}ml</strong></p>
                <a href="tracker.html" class="cta-button">Go to Tracker</a>
            `;
            resultDiv.classList.remove('hidden');
        }
    }

    // Initialize tracker if on tracker page
    if (document.querySelector('.tracker-container')) {
        initWaterTracker();
    }
});

// Water tracker functionality
function initWaterTracker() {
    // Get DOM elements
    const currentIntakeEl = document.getElementById('current-intake');
    const dailyGoalEl = document.getElementById('daily-goal');
    const waterButtons = document.querySelectorAll('.water-amount');
    const customForm = document.getElementById('custom-amount');
    const historyList = document.getElementById('intake-history');
    const circleFill = document.querySelector('.circle-fill');
    const percentageText = document.querySelector('.percentage');

    // Load saved data
    const dailyGoal = localStorage.getItem('waterNeeds') || 2000;
    let currentIntake = parseInt(localStorage.getItem('currentIntake')) || 0;
    let intakeHistory = JSON.parse(localStorage.getItem('intakeHistory')) || [];

    // Initialize display
    dailyGoalEl.textContent = dailyGoal;
    currentIntakeEl.textContent = currentIntake;
    updateProgress();
    renderHistory();

    // Water amount buttons
    waterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = parseInt(this.dataset.amount);
            addWater(amount);
        });
    });

    // Custom amount form
    customForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const amountInput = document.getElementById('amount');
        const amount = parseInt(amountInput.value);
        
        if (amount && amount >= 50 && amount <= 1000) {
            addWater(amount);
            amountInput.value = '';
        } else {
            alert('Please enter a valid amount between 50-1000ml');
        }
    });

    // Add water function
    function addWater(amount) {
        currentIntake += amount;
        localStorage.setItem('currentIntake', currentIntake);
        
        // Add to history
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        intakeHistory.unshift({ amount, time: timeString });
        
        // Keep only last 10 entries
        if (intakeHistory.length > 10) {
            intakeHistory = intakeHistory.slice(0, 10);
        }
        
        localStorage.setItem('intakeHistory', JSON.stringify(intakeHistory));
        
        // Update UI
        currentIntakeEl.textContent = currentIntake;
        updateProgress();
        renderHistory();
    }

    // Update progress circle
    function updateProgress() {
        const percentage = Math.min(Math.round((currentIntake / dailyGoal) * 100), 100);
        
        if (circleFill) {
            circleFill.setAttribute('stroke-dasharray', `${percentage}, 100`);
        }
        
        if (percentageText) {
            percentageText.textContent = `${percentage}%`;
            
            // Change color based on progress
            if (percentage >= 100) {
                circleFill?.setAttribute('stroke', '#4CAF50');
                percentageText.setAttribute('fill', '#4CAF50');
            } else {
                circleFill?.setAttribute('stroke', '#2a7fba');
                percentageText.setAttribute('fill', '#2a7fba');
            }
        }
    }

    // Render history list
    function renderHistory() {
        if (historyList) {
            historyList.innerHTML = '';
            intakeHistory.forEach(entry => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${entry.time}</span><span>+${entry.amount}ml</span>`;
                historyList.appendChild(li);
            });
        }
    }

    // Reset at midnight
    function checkForNewDay() {
        const now = new Date();
        const today = now.toDateString();
        const lastUpdated = localStorage.getItem('lastUpdated');
        
        if (!lastUpdated || new Date(lastUpdated).toDateString() !== today) {
            resetDailyData();
        }
    }

    function resetDailyData() {
        localStorage.setItem('currentIntake', '0');
        localStorage.setItem('intakeHistory', JSON.stringify([]));
        localStorage.setItem('lastUpdated', new Date().toString());
        
        currentIntake = 0;
        intakeHistory = [];
        
        if (currentIntakeEl) currentIntakeEl.textContent = '0';
        updateProgress();
        renderHistory();
    }

    // Initial check and set interval
    checkForNewDay();
    setInterval(checkForNewDay, 3600000); // Check every hour
}