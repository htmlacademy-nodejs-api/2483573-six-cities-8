import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        ${chalk.bold('Пример:')}
        ${chalk.green('cli.js --<command> [--arguments]')}
        ${chalk.bold('Команды:')}
            ${chalk.green('--version:')}                   # выводит номер версии
            ${chalk.green('--help:')}                      # печатает этот текст
            ${chalk.green('--import')} ${chalk.yellow(' <path>:')}              # импортирует данные из TSV
            ${chalk.green('--generate')} ${chalk.yellow(' <n> <path> <url>')}    # генерирует произвольное количество тестовых данных
    `);
  }
}
