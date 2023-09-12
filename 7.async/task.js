class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, action) {
        if (time == null || action == null) {
            throw new Error("Отсутствуют обязательный аргументы");
        }
        if (this.alarmCollection.find(alarm => alarm.time === time) != null) {
            console.warn("Уже присутствует звонок на это же время");
        }
        const alarm = {
            callback: action,
            time: time,
            canCall: true
        }
        this.alarmCollection.push(alarm);
    }

    removeClock(time) {
        this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
    }

    getCurrentFormattedTime() {
        const now = new Date();
        return ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2);
    }

    start() {
        if (this.intervalId != null) {
            // завершаем работу метода, потому что таймер уже запущен
            return;
        }
        const checkAlarm = function() {
            const currentTime = this.getCurrentFormattedTime();
            this.alarmCollection.forEach(alarm => {
                if (alarm.time === currentTime && alarm.canCall) {
                    alarm.canCall = false;
                    alarm.callback();
                }
            })
        }
        this.intervalId = setInterval(checkAlarm.bind(this), 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    resetAllCalls() {
        this.alarmCollection.forEach(alarm => {
            alarm.canCall = true;
        })
    }

    clearAlarms() {
        stop();
        this.alarmCollection = [];
    }
}