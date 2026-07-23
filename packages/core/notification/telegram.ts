import { Notifier } from "./types";

export default class TelegramNotifier implements Notifier {
  private m_token: string;
  private m_chatId: string;
  private m_url: string;
  constructor(token: string, chatId: string) {
    this.m_token = token;
    this.m_chatId = chatId;
    this.m_url = `https://api.telegram.org/bot${token}/sendMessage`;
  }

  public async notify(message: string): Promise<boolean> {
    const response = await fetch(this.m_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: this.m_chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });
    return response.ok;
  }
}
