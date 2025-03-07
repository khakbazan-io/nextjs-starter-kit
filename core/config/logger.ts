import type { TObject } from "../types/core";

/**
 * Defines available log levels.
 */
const LogTypes = ["DEBUG", "INFO", "WARN", "ERROR"] as const;
type LogType = (typeof LogTypes)[number];

/**
 * LoggerDriver interface that defines the structure of a logging driver.
 */
export interface LoggerDriver {
  debug: (message: string) => void;
  info: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
}

/**
 * A singleton-based **Logger** class with customizable log levels and drivers.
 *
 * - Supports multiple log levels: `DEBUG`, `INFO`, `WARN`, `ERROR`
 * - Default logging driver: `ConsoleDriver`
 * - Supports multiple instances for different logging scopes
 */
export class Logger {
  /**
   * Stores instances of loggers to ensure singleton behavior per name.
   */
  private static _loggers: TObject<Logger> = {};

  /**
   * Retrieves or creates a named Logger instance.
   *
   * @param {string} [name="main"] - The name of the logger instance.
   * @returns {Logger} A singleton logger instance.
   */
  static getInstance(name = "main"): Logger {
    if (!Logger._loggers[name]) {
      Logger._loggers[name] = new Logger();
    }
    return Logger._loggers[name];
  }

  private _logLevel: LogType = "DEBUG";
  private _driver: LoggerDriver = new ConsoleDriver();

  /**
   * Formats log messages with timestamp, log level, and data.
   *
   * @param {LogType} type - The log type (`DEBUG`, `INFO`, `WARN`, `ERROR`).
   * @param {string[]} data - The log messages.
   * @returns {string} The formatted log message.
   */
  private static _format(type: LogType, data: string[]): string {
    return `${new Date().toISOString()} ${type.padStart(6)}: ${data.join(" | ")}`;
  }

  /**
   * Retrieves the current log level.
   */
  get logLevel(): LogType {
    return this._logLevel;
  }

  /**
   * Updates the log level for the logger instance.
   */
  set logLevel(level: LogType) {
    this._logLevel = level;
  }

  /**
   * Sets a custom logging driver (must implement `LoggerDriver`).
   */
  set driver(driver: LoggerDriver) {
    this._driver = driver;
  }

  /**
   * Logs a **debug** message.
   *
   * @param {...any[]} data - The messages to log.
   */
  debug(...data: any[]) {
    if (this._logLevel === "DEBUG") {
      this._driver.debug(Logger._format("DEBUG", data));
    }
  }

  /**
   * Logs an **info** message.
   *
   * @param {...any[]} data - The messages to log.
   */
  info(...data: any[]) {
    if (["DEBUG", "INFO"].includes(this._logLevel)) {
      this._driver.info(Logger._format("INFO", data));
    }
  }

  /**
   * Logs a **warning** message.
   *
   * @param {...any[]} data - The messages to log.
   */
  warn(...data: any[]) {
    if (["DEBUG", "INFO", "WARN"].includes(this._logLevel)) {
      this._driver.warn(Logger._format("WARN", data));
    }
  }

  /**
   * Logs an **error** message.
   *
   * @param {...any[]} data - The messages to log.
   */
  error(...data: any[]) {
    this._driver.error(Logger._format("ERROR", data));
  }
}

/**
 * A basic console-based logging driver implementing `LoggerDriver`.
 */
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

/**
 * Default logger instance.
 */
export const logger = Logger.getInstance();
