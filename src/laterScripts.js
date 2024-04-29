
/*This is the one created when prompted by VS Code*/

document.addEventListener('DOMContentLoaded', (event) => {

	let time = document.getElementById("time");
	let dateTimeInput = document.getElementById("meeting-time");
	let taskNameInput = document.getElementById("taskName");
	let btn = document.getElementById("setAlarm");
	let contan = document.getElementById("alarms");
	let interVal;
	let maxValue = 3;
	let cnt = 0;
	let almTimesArray = [];

	function timeChangeFunction() {
		let curr = new Date();
		let hrs = curr.getHours();
		let min = String(curr.getMinutes()).padStart(2, "0");
		let sec = String(curr.getSeconds()).padStart(2, "0");
		let period = "AM";
		if (hrs >= 12) {
			period = "PM";
			if (hrs > 12) {
					hrs -= 12;
			}
		}
		hrs = String(hrs).padStart(2, "0");
		time.textContent = `${hrs}:${min}:${sec} ${period}`;
	}

	function alarmSetFunction() {
		let now = new Date();
		let selectedDateTime = dateTimeInput.value;
		let selectedDate = new Date(selectedDateTime);
		let taskName = taskNameInput.value.trim();
		if (selectedDate <= now || !taskName) {
			alert("Invalid time or missing task name. Please select a future date and time and enter a task name.");
			return;
		}
		if (almTimesArray.includes(selectedDate.toString())) {
			alert("You cannot set multiple alarms for the same time.");
			return;
		}
		if (cnt < maxValue) {
			let timeUntilAlarm = selectedDate - now;
			let alarmDiv = document.createElement("div");
			alarmDiv.classList.add("alarm");
			alarmDiv.innerHTML = `
					<span>${taskName} - ${selectedDate.toLocaleString()}</span>
					<button class="delete-alarm">Delete</button>
			`;
			alarmDiv.querySelector(".delete-alarm").addEventListener("click", () => {
					alarmDiv.remove();
					cnt--;
					clearTimeout(interVal);
					const idx = almTimesArray.indexOf(selectedDate.toString());
					if (idx !== -1) {
						almTimesArray.splice(idx, 1);
					}
			});
			interVal = setTimeout(() => {
					alert("Time to wake up for " + taskName + "!");
					alarmDiv.remove();
					cnt--;
					const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
					if (alarmIndex !== -1) {
						almTimesArray.splice(alarmIndex, 1);
					}
			}, timeUntilAlarm);
			contan.appendChild(alarmDiv);
			cnt++;
			almTimesArray.push(selectedDate.toString());
		} else {
			alert("You can only set a maximum of 3 alarms.");
		}
	}

	setInterval(timeChangeFunction, 1000);
	btn.addEventListener("click", alarmSetFunction);
	timeChangeFunction();

});
