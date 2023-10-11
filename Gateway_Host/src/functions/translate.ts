import { translate } from 'free-translate';
import { Locale } from 'free-translate/dist/types/locales';
import chalk from 'chalk';
import i18next from 'i18next';

export default async function Translate(content: string, t: string, f: string | undefined) {
    try {
        const _to = t as Locale;
        const _from = f as Locale;

        const translation = await translate(content, { from: _from, to: _to })

        return translation;
    } catch (error) {
        console.log({ content, t, f });
        console.error(chalk.redBright(error));
    }

    return i18next.t('errors.translate.unknown') || "Unkown Error";
}