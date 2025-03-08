const bot = BotManager.getCurrentBot();
const { DateTime, Date, Time } = require('../../global_modules/DateTime');

/** @param {DateTime} dt */
function dayOfYear(dt) {
    let ret = dt.day;
    for (let m = 1; m < dt.month; m++)
        ret += DateTime.lengthOfMonth(dt.year, m);
    return ret;
}

/** @return {DateTime} */
function fromDay(year, day) {
    let month = 1;
    while (day > DateTime.lengthOfMonth(year, month)) {
        day -= DateTime.lengthOfMonth(year, month);
        month++;
    }

    let ret = DateTime.today();
    ret.date = new Date(year, month, day);

    return ret;
}

/** @param {DateTime} dt
 * @param {Boolean} shutdown */
function getMeal(dt, shutdown=false) {
    const HOST = 'localhost';
    const PORT = 5000;

    try {
        const socket = new java.net.Socket(HOST, PORT);
        const outStream = new java.io.PrintWriter(socket.getOutputStream(), true);
        const inStream = new java.io.BufferedReader(new java.io.InputStreamReader(socket.getInputStream()));

        if (shutdown)
            outStream.println("shutdown");
        else {
            outStream.println(JSON.stringify({
                year: dt.year ?? DateTime.today().year,
                month: dt.month ?? DateTime.today().month,
                day: dt.day ?? DateTime.today().day
            }));
        }

        let response = "";
        let line;
        while ((line = inStream.readLine()) !== null)
            response += line + "\n";

        socket.close();
        return JSON.parse(response.trim());
    } catch (err) {
        Log.e("서버 연결 오류:\n" + err.message);
    }
}

bot.addListener(Event.MESSAGE, msg => {
    if (msg.content === "shutdown")
        getMeal(DateTime.today(), true);

    const breakfast = new Time(8, 30, 0, 0);
    const lunch = new Time(12, 30, 0, 0);
    const dinner = new Time(18, 0, 0, 0);

    const { from, to } = DateTime.parseDuration(msg.content);

    if (from == null || to == null) {
        msg.reply("잘못된 날짜입니다.");
        return;
    } else if (from.eq(to)) {
        msg.reply(`${from.humanize(true)}의 학식을 가져오고 있습니다...`);
    } else {
        msg.reply(`${from.humanize(true)}부터 ${to.humanize(true)}까지의 학식을 가져오고 있습니다...`);
    }

    // todo: 서로 다른 연도의 학식도 받을 수 있게

    for (let day = dayOfYear(from); day <= dayOfYear(to); day++) {
        let dt = fromDay(from.year, day);

        let message = '';
        let meal = getMeal(dt);

        if ((from.le(dt.at(breakfast)) && dt.at(breakfast).le(to)) || from.eq(to)) {
            message += `🍳 조식\n · ${meal['breakfast'].join('\n · ')}\n\n`;
            message += `🍳 간단한 조식\n · ${meal['simple_breakfast'].join('\n · ')}\n\n`;
        }
        if ((from.le(dt.at(lunch)) && dt.at(lunch).le(to)) || from.eq(to)) {
            message += `🍔 일품\n · ${meal['rich_lunch'].join('\n · ')}\n\n`;
            message += `🍔 중식\n · ${meal['lunch'].join('\n · ')}\n\n`;
        }
        if ((from.le(dt.at(dinner)) && dt.at(dinner).le(to)) || from.eq(to))
            message += `🍱 석식\n · ${meal['dinner'].join('\n · ')}\n\n`;

        if (message.length > 0)
            msg.reply(`🍚 ${dt.humanize(true)} 제2학생식당 학식${'\u200b'.repeat(500)}\n——\n` + message.trim());
    }
});
