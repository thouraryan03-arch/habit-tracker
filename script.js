const habitInput = document.getElementById("habit-input");
const addButton = document.getElementById("add-button");
const habitList = document.getElementById("habit-list");

const progressText = document.getElementById("progress-text");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");

let habits = [];

// Add a new habit
addButton.addEventListener("click", addHabit);

function addHabit() {

    const habitName = habitInput.value.trim();

    if (habitName === "") {
        return;
    }

    const habit = {
        name: habitName,
        completed: false
    };

    habits.push(habit);

    habitInput.value = "";

    displayHabits();
    updateProgress();
}


// Display all habits
function displayHabits() {

    habitList.innerHTML = "";

    if (habits.length === 0) {

        habitList.innerHTML = `
            <p class="empty-message">
                No habits yet. Add your first habit!
            </p>
        `;

        return;
    }

    habits.forEach((habit, index) => {

        const habitCard = document.createElement("div");

        habitCard.classList.add("habit-card");

        if (habit.completed) {
            habitCard.classList.add("completed");
        }

        habitCard.innerHTML = `
            <div class="habit-info">
                <h3>${habit.name}</h3>
                <p>Daily goal</p>
            </div>

            <input
                type="checkbox"
                ${habit.completed ? "checked" : ""}
                onchange="toggleHabit(${index})"
            >
        `;

        habitList.appendChild(habitCard);
    });
}


// Mark habit as completed/uncompleted
function toggleHabit(index) {

    habits[index].completed = !habits[index].completed;

    displayHabits();
    updateProgress();
}


// Update progress
function updateProgress() {

    const totalHabits = habits.length;

    const completedHabits = habits.filter(
        habit => habit.completed
    ).length;

    if (totalHabits === 0) {

        progressText.textContent = "0 of 0 completed";
        progressPercent.textContent = "0%";
        progressFill.style.width = "0%";

        return;
    }

    const percentage = Math.round(
        (completedHabits / totalHabits) * 100
    );

    progressText.textContent =
        `${completedHabits} of ${totalHabits} completed`;

    progressPercent.textContent =
        `${percentage}%`;

    progressFill.style.width =
        `${percentage}%`;
}