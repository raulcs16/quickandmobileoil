export interface Notifier {
  notify(message: string): Promise<boolean>;
}
