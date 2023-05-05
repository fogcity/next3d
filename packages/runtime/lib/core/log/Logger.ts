import { Serialize } from '../meta/Serialize';
export class Logger {
  private static instance: Logger;
  private constructor(public engine?: string) {
    // ..
  }
  public static getInstance(engine?: string) {
    if (!Logger.instance) {
      Logger.instance = new Logger(engine);
    }

    return Logger.instance;
  }

  info(message: string) {
    console.info(message);
  }

  error(message: string) {
    console.error(message);
  }

  warning(message: string) {
    console.warn(message);
  }
}
