import type { TObject } from "../types/core";

const LogTypes = ["DEBUG", "INFO", "WARN", "ERROR"] as const;
type LogType = (typeof LogTypes)[number];

export interface LoggerDriver {
  debug: (message: string) => void;
  info: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
}

export class Logger {
  static _loggers: TObject<Logger> = {};

  static getInstance(name = "main") {
    if (!Logger._loggers[name]) {
      Logger._loggers[name] = new Logger();
    }

    return Logger._loggers[name];
  }

  _logLevel: LogType = "DEBUG";
  _driver: LoggerDriver = new ConsoleDriver();

  static _format(type: LogType, data: string[]) {
    return `${Date.now().toLocaleString().padStart(18)} ${type.padStart(6)}: ${data.join(" | ")}`;
  }

  get logLevel() {
    return this._logLevel;
  }

  set logLevel(level: LogType) {
    this._logLevel = level;
  }

  set driver(level: LogType) {
    this._logLevel = level;
  }

  debug(...data: any[]) {
    this._driver.debug(Logger._format("DEBUG", data));
  }
  info(...data: any[]) {
    this._driver.info(Logger._format("INFO", data));
  }
  error(...data: any[]) {
    this._driver.error(Logger._format("ERROR", data));
  }
  warn(...data: any[]) {
    this._driver.warn(Logger._format("WARN", data));
  }
}

export class ConsoleDriver implements LoggerDriver {
  debug(message: string) {
    console.debug(message);
  }
  info(message: string) {
    console.info(message);
  }
  error(message: string) {
    console.error(message);
  }
  warn(message: string) {
    console.warn(message);
  }
}

export const logger = Logger.getInstance();
