const bot = BotManager.getCurrentBot();

const HOST = 'localhost';
const PORT = 5000;

bot.addListener(Event.MESSAGE, msg => {
    try {
        const socket = new java.net.Socket(HOST, PORT);
        const outStream = new java.io.PrintWriter(socket.getOutputStream(), true);
        const inStream = new java.io.BufferedReader(new java.io.InputStreamReader(socket.getInputStream()));

        outStream.println(msg.content);
        let response = "";
        let line;

        while ((line = inStream.readLine()) !== null) {
            response += line + "\n";
        }

        socket.close();
        msg.reply(response.trim());
    } catch (err) {
        msg.reply("서버 연결 오류:\n" + err.message);
    }
});