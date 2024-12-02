import { readFileSync } from 'fs-extra';

export function genTestFileContents (
    path: string
): string[] {
    const content = readFileSync(path).toString();

    const divider = '\r\n----------------------------\r\n';

    return content.split(divider);
}
