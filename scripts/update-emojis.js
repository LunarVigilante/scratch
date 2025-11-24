const fs = require('fs');
const https = require('https');
const path = require('path');

const EMOJI_URL = 'https://unpkg.com/emoji.json@15.0.0/emoji.json';
const OUTPUT_FILE = path.join(__dirname, '../src/data/emojis.ts');

const fetchEmojis = () => {
    return new Promise((resolve, reject) => {
        https.get(EMOJI_URL, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
};

const cleanCategory = (category) => {
    // Remove sub-category info if present (e.g., "Smileys & Emotion (face-smiling)" -> "Smileys & Emotion")
    return category.split('(')[0].trim();
};

const processEmojis = (emojis) => {
    const categories = {};

    emojis.forEach(emoji => {
        const category = cleanCategory(emoji.group); // 'group' field usually holds the main category
        if (!categories[category]) {
            categories[category] = [];
        }

        // Clean up name
        const name = emoji.name.toLowerCase();

        // Generate keywords (simple split for now, could be improved)
        const keywords = name.split(' ').filter(w => w.length > 2);

        categories[category].push({
            char: emoji.char,
            name: name,
            keywords: keywords
        });
    });

    return categories;
};

const generateFileContent = (categories) => {
    let content = `export interface Emoji {
    char: string;
    name: string;
    keywords: string[];
}

export const emojiCategories: Record<string, Emoji[]> = {
`;

    for (const [category, emojis] of Object.entries(categories)) {
        content += `    '${category}': [\n`;
        emojis.forEach(emoji => {
            content += `        { char: '${emoji.char}', name: '${emoji.name}', keywords: ${JSON.stringify(emoji.keywords)} },\n`;
        });
        content += `    ],\n`;
    }

    content += `};\n`;
    return content;
};

const main = async () => {
    try {
        console.log('Fetching emojis...');
        const emojis = await fetchEmojis();
        console.log(`Fetched ${emojis.length} emojis.`);

        const categories = processEmojis(emojis);
        console.log(`Processed ${Object.keys(categories).length} categories:`, Object.keys(categories));

        const content = generateFileContent(categories);
        fs.writeFileSync(OUTPUT_FILE, content);
        console.log(`Updated ${OUTPUT_FILE}`);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

main();
