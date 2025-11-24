import twemoji from 'twemoji';

export const parseTwemoji = (text: string) => {
    return twemoji.parse(text, {
        folder: 'svg',
        ext: '.svg'
    });
};
