export interface Theme {
    name: string;
    type: 'dark' | 'light';
    bg: string;
    fg: string;
    primary: string;
    border: string;
    surface: string;
    surfaceHighlight: string;
    editorBg: string;
}

export const themes: Record<string, Theme> = {
    // Basics
    'dark': {
        name: 'Dark',
        type: 'dark',
        bg: '#141729',
        fg: '#ffffff',
        primary: '#41b883',
        border: '#2d3245',
        surface: '#1d2236',
        surfaceHighlight: '#2d3245',
        editorBg: '#0f111f'
    },
    'light': {
        name: 'Light',
        type: 'light',
        bg: '#f5f7fa',
        fg: '#2d3245',
        primary: '#41b883',
        border: '#e1e4e8',
        surface: '#ffffff',
        surfaceHighlight: '#e1e4e8',
        editorBg: '#ffffff'
    },

    // Popular
    'dracula': {
        name: 'Dracula',
        type: 'dark',
        bg: '#282a36',
        fg: '#f8f8f2',
        primary: '#ff79c6',
        border: '#44475a',
        surface: '#44475a',
        surfaceHighlight: '#6272a4',
        editorBg: '#21222c'
    },
    'monokai': {
        name: 'Monokai',
        type: 'dark',
        bg: '#272822',
        fg: '#f8f8f2',
        primary: '#a6e22e',
        border: '#3e3d32',
        surface: '#3e3d32',
        surfaceHighlight: '#49483e',
        editorBg: '#1e1f1c'
    },
    'nord-dark': {
        name: 'Nord Dark',
        type: 'dark',
        bg: '#2e3440',
        fg: '#d8dee9',
        primary: '#88c0d0',
        border: '#3b4252',
        surface: '#3b4252',
        surfaceHighlight: '#434c5e',
        editorBg: '#242933'
    },
    'nord-light': {
        name: 'Nord Light',
        type: 'light',
        bg: '#eceff4',
        fg: '#2e3440',
        primary: '#5e81ac',
        border: '#d8dee9',
        surface: '#e5e9f0',
        surfaceHighlight: '#d8dee9',
        editorBg: '#ffffff'
    },
    'solarized-dark': {
        name: 'Solarized Dark',
        type: 'dark',
        bg: '#002b36',
        fg: '#839496', // Reverted
        primary: '#b58900',
        border: '#073642',
        surface: '#073642',
        surfaceHighlight: '#586e75',
        editorBg: '#00212b'
    },
    'solarized-light': {
        name: 'Solarized Light',
        type: 'light',
        bg: '#fdf6e3',
        fg: '#657b83',
        primary: '#b58900',
        border: '#eee8d5',
        surface: '#eee8d5',
        surfaceHighlight: '#93a1a1',
        editorBg: '#fffbf0'
    },
    'atom-one-dark': {
        name: 'Atom One Dark',
        type: 'dark',
        bg: '#282c34',
        fg: '#abb2bf',
        primary: '#61afef',
        border: '#3e4451',
        surface: '#21252b',
        surfaceHighlight: '#3e4451',
        editorBg: '#21252b'
    },
    'atom-one-light': {
        name: 'Atom One Light',
        type: 'light',
        bg: '#fafafa',
        fg: '#383a42',
        primary: '#4078f2',
        border: '#e5e5e6',
        surface: '#ffffff',
        surfaceHighlight: '#e5e5e6',
        editorBg: '#ffffff'
    },

    // Vibrant / Cyberpunk
    'cyberpunk': {
        name: 'Cyberpunk',
        type: 'dark',
        bg: '#2d2b55',
        fg: '#f8f8f2',
        primary: '#ff0055',
        border: '#1e1c3b',
        surface: '#1e1c3b',
        surfaceHighlight: '#4d4b85',
        editorBg: '#232142'
    },
    'cyberpunk-scarlet': {
        name: 'Cyberpunk Scarlet',
        type: 'dark',
        bg: '#120b10',
        fg: '#ff0055', // Reverted
        primary: '#00ff9f',
        border: '#2d1b25',
        surface: '#1f1118',
        surfaceHighlight: '#2d1b25',
        editorBg: '#0a0609'
    },
    'plastic-world': {
        name: 'Plastic World',
        type: 'dark',
        bg: '#252b45',
        fg: '#e9e9f2',
        primary: '#e06c75',
        border: '#343d63',
        surface: '#2f3657',
        surfaceHighlight: '#343d63',
        editorBg: '#1d2236'
    },
    'hacker-green': {
        name: 'Hacker Green',
        type: 'dark',
        bg: '#0d1117',
        fg: '#00ff00', // Reverted
        primary: '#00ff00',
        border: '#161b22',
        surface: '#0d1117',
        surfaceHighlight: '#161b22',
        editorBg: '#000000'
    },
    'hacker-blue': {
        name: 'Hacker Blue',
        type: 'dark',
        bg: '#0d1117',
        fg: '#00aaff', // Reverted
        primary: '#00aaff',
        border: '#161b22',
        surface: '#0d1117',
        surfaceHighlight: '#161b22',
        editorBg: '#000000'
    },

    // Soft / Pastel
    'catppuccin-mocha': {
        name: 'Catppuccin Mocha',
        type: 'dark',
        bg: '#1e1e2e',
        fg: '#cdd6f4',
        primary: '#cba6f7',
        border: '#313244',
        surface: '#181825',
        surfaceHighlight: '#313244',
        editorBg: '#181825'
    },
    'catppuccin-latte': {
        name: 'Catppuccin Latte',
        type: 'light',
        bg: '#eff1f5',
        fg: '#4c4f69',
        primary: '#8839ef',
        border: '#e6e9ef',
        surface: '#dce0e8',
        surfaceHighlight: '#ccd0da',
        editorBg: '#ffffff'
    },
    'rose-pine': {
        name: 'Rosé Pine',
        type: 'dark',
        bg: '#191724',
        fg: '#e0def4',
        primary: '#ebbcba',
        border: '#26233a',
        surface: '#1f1d2e',
        surfaceHighlight: '#26233a',
        editorBg: '#12101b'
    },
    'rose-pine-moon': {
        name: 'Rosé Pine Moon',
        type: 'dark',
        bg: '#232136',
        fg: '#e0def4',
        primary: '#ea9a97',
        border: '#393552',
        surface: '#2a273f',
        surfaceHighlight: '#393552',
        editorBg: '#1d1b2d'
    },
    'rose-pine-dawn': {
        name: 'Rosé Pine Dawn',
        type: 'light',
        bg: '#faf4ed',
        fg: '#575279',
        primary: '#d7827e',
        border: '#f2e9e1',
        surface: '#fffaf3',
        surfaceHighlight: '#f2e9e1',
        editorBg: '#fffaf3'
    },
    'flexoki-dark': {
        name: 'Flexoki Dark',
        type: 'dark',
        bg: '#100f0f',
        fg: '#cecdc3',
        primary: '#da702c',
        border: '#282726',
        surface: '#1c1b1a',
        surfaceHighlight: '#282726',
        editorBg: '#0a0909'
    },
    'flexoki-light': {
        name: 'Flexoki Light',
        type: 'light',
        bg: '#fffcf0',
        fg: '#100f0f',
        primary: '#d14d28',
        border: '#e6e4d9',
        surface: '#f2f0e5',
        surfaceHighlight: '#e6e4d9',
        editorBg: '#ffffff'
    },
    'everforest-dark': {
        name: 'Everforest Dark',
        type: 'dark',
        bg: '#2b3339',
        fg: '#d3c6aa',
        primary: '#a7c080',
        border: '#323c41',
        surface: '#323c41',
        surfaceHighlight: '#3a454a',
        editorBg: '#232a2e'
    },
    'everforest-light': {
        name: 'Everforest Light',
        type: 'light',
        bg: '#fdf6e3',
        fg: '#5c6a72',
        primary: '#93b259',
        border: '#f4f0d9',
        surface: '#f4f0d9',
        surfaceHighlight: '#efebd4',
        editorBg: '#fffbf0'
    },

    // Retro
    '1984-dark': {
        name: '1984 Dark',
        type: 'dark',
        bg: '#0d0e15',
        fg: '#ff77ff', // Reverted
        primary: '#ff0055',
        border: '#1a1c29',
        surface: '#13141f',
        surfaceHighlight: '#1a1c29',
        editorBg: '#08080c'
    },
    '1984-light': {
        name: '1984 Light',
        type: 'light',
        bg: '#f5f5f5',
        fg: '#2d2d2d',
        primary: '#ff0055',
        border: '#e0e0e0',
        surface: '#ffffff',
        surfaceHighlight: '#e0e0e0',
        editorBg: '#ffffff'
    },
    'gruvbox-dark': {
        name: 'Gruvbox Dark',
        type: 'dark',
        bg: '#282828',
        fg: '#ebdbb2',
        primary: '#fb4934',
        border: '#3c3836',
        surface: '#3c3836',
        surfaceHighlight: '#504945',
        editorBg: '#1d2021'
    },
    'gruvbox-light': {
        name: 'Gruvbox Light',
        type: 'light',
        bg: '#fbf1c7',
        fg: '#3c3836',
        primary: '#cc241d',
        border: '#ebdbb2',
        surface: '#ebdbb2',
        surfaceHighlight: '#d5c4a1',
        editorBg: '#f9f5d7'
    },

    // Specifics
    'tokyo-night': {
        name: 'Tokyo Night',
        type: 'dark',
        bg: '#1a1b26',
        fg: '#a9b1d6',
        primary: '#7aa2f7',
        border: '#24283b',
        surface: '#24283b',
        surfaceHighlight: '#414868',
        editorBg: '#16161e'
    },
    'tokyo-day': {
        name: 'Tokyo Day',
        type: 'light',
        bg: '#e1e2e7',
        fg: '#3760bf', // Reverted
        primary: '#2e7de9',
        border: '#d0d5e3',
        surface: '#d0d5e3',
        surfaceHighlight: '#b4b5b9',
        editorBg: '#ffffff'
    },
    'night-owl': {
        name: 'Night Owl',
        type: 'dark',
        bg: '#011627',
        fg: '#d6deeb',
        primary: '#82aaff',
        border: '#0b2942',
        surface: '#0b2942',
        surfaceHighlight: '#234d70',
        editorBg: '#01111d'
    },
    'light-owl': {
        name: 'Light Owl',
        type: 'light',
        bg: '#f0f0f0',
        fg: '#403f53',
        primary: '#2c7c77',
        border: '#d6deeb',
        surface: '#ffffff',
        surfaceHighlight: '#d6deeb',
        editorBg: '#ffffff'
    },
    'cobalt2': {
        name: 'Cobalt2',
        type: 'dark',
        bg: '#193549',
        fg: '#ffffff',
        primary: '#ffc600',
        border: '#15232d',
        surface: '#15232d',
        surfaceHighlight: '#35495e',
        editorBg: '#132836'
    },
    'kanagawa-dragon': {
        name: 'Kanagawa Dragon',
        type: 'dark',
        bg: '#181616',
        fg: '#c5c9c5',
        primary: '#c4746e',
        border: '#221e1e',
        surface: '#1f1f28',
        surfaceHighlight: '#221e1e',
        editorBg: '#121111'
    },
    'kanagawa-wave': {
        name: 'Kanagawa Wave',
        type: 'dark',
        bg: '#1f1f28',
        fg: '#dcd7ba',
        primary: '#7e9cd8',
        border: '#2a2a37',
        surface: '#2a2a37',
        surfaceHighlight: '#363646',
        editorBg: '#16161d'
    },
    'aura': {
        name: 'Aura',
        type: 'dark',
        bg: '#15141b',
        fg: '#edecee',
        primary: '#a277ff',
        border: '#21202e',
        surface: '#1c1b22',
        surfaceHighlight: '#21202e',
        editorBg: '#110f14'
    },
    'octocat-dark': {
        name: 'Octocat Dark',
        type: 'dark',
        bg: '#0d1117',
        fg: '#c9d1d9',
        primary: '#58a6ff',
        border: '#30363d',
        surface: '#161b22',
        surfaceHighlight: '#21262d',
        editorBg: '#090c10'
    },
    'octocat-light': {
        name: 'Octocat Light',
        type: 'light',
        bg: '#ffffff',
        fg: '#24292f',
        primary: '#0969da',
        border: '#d0d7de',
        surface: '#f6f8fa',
        surfaceHighlight: '#d0d7de',
        editorBg: '#ffffff'
    },
    'ayu-dark': {
        name: 'Ayu Dark',
        type: 'dark',
        bg: '#0b0e14',
        fg: '#b3b1ad',
        primary: '#e6b450',
        border: '#151a25',
        surface: '#0f131a',
        surfaceHighlight: '#151a25',
        editorBg: '#07090d'
    },
    'ayu-light': {
        name: 'Ayu Light',
        type: 'light',
        bg: '#fafafa',
        fg: '#5c6166',
        primary: '#ff9940',
        border: '#f0f0f0',
        surface: '#ffffff',
        surfaceHighlight: '#f0f0f0',
        editorBg: '#ffffff'
    },
    'romania-night': {
        name: 'Romania Night',
        type: 'dark',
        bg: '#1c1c1c',
        fg: '#e0e0e0', // Reverted
        primary: '#ffcc00',
        border: '#333333',
        surface: '#262626',
        surfaceHighlight: '#333333',
        editorBg: '#141414'
    },
    'romania-day': {
        name: 'Romania Day',
        type: 'light',
        bg: '#f2f2f2',
        fg: '#333333',
        primary: '#d62d20',
        border: '#e0e0e0',
        surface: '#ffffff',
        surfaceHighlight: '#e0e0e0',
        editorBg: '#ffffff'
    },
    'winter-night': {
        name: 'Winter Night',
        type: 'dark',
        bg: '#101421',
        fg: '#d4d4d4', // Reverted
        primary: '#00bfff',
        border: '#1e2330',
        surface: '#171b29',
        surfaceHighlight: '#1e2330',
        editorBg: '#0b0e17'
    },
    'winter-day': {
        name: 'Winter Day',
        type: 'light',
        bg: '#f4f7fa',
        fg: '#2f3b55',
        primary: '#007acc',
        border: '#e1e5eb',
        surface: '#ffffff',
        surfaceHighlight: '#e1e5eb',
        editorBg: '#ffffff'
    },
    'aubergine': {
        name: 'Aubergine',
        type: 'dark',
        bg: '#290025',
        fg: '#e0e0e0', // Reverted
        primary: '#ff50a0',
        border: '#45003f',
        surface: '#380032',
        surfaceHighlight: '#45003f',
        editorBg: '#1f001c'
    },
    'peach-fresh': {
        name: 'Peach Fresh',
        type: 'light',
        bg: '#ffdab9',
        fg: '#5c4033',
        primary: '#ff6f61',
        border: '#ffcba4',
        surface: '#ffe5b4',
        surfaceHighlight: '#ffcba4',
        editorBg: '#ffe5b4'
    },
    'diwali': {
        name: 'Diwali',
        type: 'dark',
        bg: '#281a36',
        fg: '#ffdf00', // Reverted
        primary: '#ff9933',
        border: '#3d2b4d',
        surface: '#322242',
        surfaceHighlight: '#3d2b4d',
        editorBg: '#1e1329'
    },
    'movember': {
        name: 'Movember',
        type: 'dark',
        bg: '#1a1100',
        fg: '#e0e0e0', // Reverted
        primary: '#8b4513',
        border: '#332200',
        surface: '#261a00',
        surfaceHighlight: '#332200',
        editorBg: '#110b00'
    },
    'halloween': {
        name: 'Halloween',
        type: 'dark',
        bg: '#1a0505',
        fg: '#ff9900', // Reverted
        primary: '#ff6600',
        border: '#330a0a',
        surface: '#260808',
        surfaceHighlight: '#330a0a',
        editorBg: '#110303'
    },
    'dia-de-muertos': {
        name: 'Dia De Muertos',
        type: 'dark',
        bg: '#1a1a1a',
        fg: '#ffffff',
        primary: '#ff00ff',
        border: '#333333',
        surface: '#262626',
        surfaceHighlight: '#333333',
        editorBg: '#111111'
    },
    'silver-aerogel': {
        name: 'Silver Aerogel',
        type: 'light', // It has a lightish gray bg, let's call it light for now or keep dark? User said "preview pane on dark themes". If I mark it light, it won't get the override.
        bg: '#808080', // Reverted
        fg: '#000000', // Reverted
        primary: '#c0c0c0',
        border: '#a0a0a0',
        surface: '#909090',
        surfaceHighlight: '#a0a0a0',
        editorBg: '#707070'
    },
    'manhattan': {
        name: 'Manhattan',
        type: 'dark',
        bg: '#111111',
        fg: '#e0e0e0', // Reverted
        primary: '#555555',
        border: '#333333',
        surface: '#222222',
        surfaceHighlight: '#333333',
        editorBg: '#0a0a0a'
    },
    'grass': {
        name: 'Grass',
        type: 'dark',
        bg: '#1a3300',
        fg: '#e0e0e0', // Reverted
        primary: '#66cc00',
        border: '#264d00',
        surface: '#204000',
        surfaceHighlight: '#264d00',
        editorBg: '#112200'
    },
    'man-page': {
        name: 'Man Page',
        type: 'light',
        bg: '#fef49c',
        fg: '#000000',
        primary: '#000000',
        border: '#e6db8b',
        surface: '#fdf08e',
        surfaceHighlight: '#e6db8b',
        editorBg: '#fdf08e'
    },
    'novel': {
        name: 'Novel',
        type: 'light',
        bg: '#dfdbe5',
        fg: '#3b3b3b',
        primary: '#990000',
        border: '#d1cdd7',
        surface: '#e8e4ee',
        surfaceHighlight: '#d1cdd7',
        editorBg: '#e8e4ee'
    },
    'ocean': {
        name: 'Ocean',
        type: 'dark',
        bg: '#224fbc',
        fg: '#ffffff',
        primary: '#00ffff',
        border: '#1b3f96',
        surface: '#1e46a8',
        surfaceHighlight: '#1b3f96',
        editorBg: '#1b3f96'
    },
    'red-sands': {
        name: 'Red Sands',
        type: 'dark',
        bg: '#7a251e',
        fg: '#f7f1ff',
        primary: '#dfc4b6',
        border: '#621d18',
        surface: '#6d211b',
        surfaceHighlight: '#621d18',
        editorBg: '#6d211b'
    },
    'homebrew': {
        name: 'Homebrew',
        type: 'dark',
        bg: '#000000',
        fg: '#00ff00', // Reverted
        primary: '#00ff00',
        border: '#333333',
        surface: '#111111',
        surfaceHighlight: '#333333',
        editorBg: '#000000'
    },
    'basic': {
        name: 'Basic',
        type: 'light',
        bg: '#ffffff',
        fg: '#000000',
        primary: '#0000ff',
        border: '#cccccc',
        surface: '#f0f0f0',
        surfaceHighlight: '#e0e0e0',
        editorBg: '#ffffff'
    },
    'pro': {
        name: 'Pro',
        type: 'dark',
        bg: '#000000',
        fg: '#ffffff',
        primary: '#ffffff',
        border: '#333333',
        surface: '#111111',
        surfaceHighlight: '#333333',
        editorBg: '#000000'
    }
};

export const defaultTheme = 'dark';
export type ThemeId = string;
