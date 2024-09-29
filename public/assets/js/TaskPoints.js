// TaskPoints.js

// Mapping user-friendly platform names to internal TaskPoints keys
const platformMapping = {
    'Apple Store': 'AppleStore',
    'Playstore': 'Playstore',
    'BBN': 'BBN',
    'Apple Music': 'AppleMusic',
    'Spotify': 'Spotify',
    'Audiomack': 'Audiomack',
    'SoundCloud': 'SoundCloud',
    'Tiktok': 'Tiktok',
    'Instagram': 'Instagram',
    'Facebook': 'Facebook',
    'YouTube': 'YouTube',
    'Twitter': 'Twitter',
    'Snapchat': 'Snapchat',
    'WhatsApp': 'WhatsApp',
    'Telegram': 'Telegram',
    'Review': 'Review'
};

// Update TaskPoints class to handle platform mapping
class TaskPoints {
    constructor() {
        this.tasks = {
            Instagram: {
                'make a reel using sound': 2000,
                'Comment on post feed': 20,
                'Comment on reel': 20,
                'Customized comment': 50,
                'Engage on a story post': 20,
                'Follow a page': 10,
                'Like a post feed': 15,
                'Like a reel': 15,
                'Premium comment on a post': 40,
                'Save a post': 20,
                'Share a post to story': 30,
                'Wish someone a Happy Birthday': 40,
                'Wish someone a Happy International Women’s Day': 30
            },
            Facebook: {
                'Comment on a post': 20,
                'make a video using sound': 20,
                'Follow a page': 10,
                'Like a post': 6,
                'Premium comment on a post': 40,
                'Share content to Facebook': 10
            },
            Tiktok: {
                'make a video using sound': 3000,
                'Stitch a video': 3000,
                'Duet a video': 3000,
                'Comment on a post': 20,
                'Favorite a post': 10,
                'Follow a page': 13,
                'Like a post': 6,
                'Premium comment on a video': 40,
                'Repost a video': 20
            },
            YouTube: {
                'Comment on a video': 30,
                'Like a video': 8,
                'Like a YouTube shorts': 8,
                'Premium comment on a video': 40,
                'Subscribe to a channel': 35
            },
            Twitter: {
                'Comment on a post': 20,
                'Follow a page': 12,
                'Like a tweet': 6,
                'Premium comment on a tweet': 40,
                'Retweet a tweet': 10
            },
            WhatsApp: {
                'Post a content': 30
            },
            Threads: {
                'Comment on a thread': 30,
                'Follow a page': 15,
                'Like a thread': 7
            },
            Telegram: {
                'React to a post on channel (+ views)': 35,
                'Subscribe to a channel': 30
            },
            Snapchat: {
                'Follow a page': 40,
                'View story': 35,
                'make a video using sound': 3000
            },
            Playstore: {
                'Download a mobile application': 35,
                'Download, rate, and review a mobile application': 85,
                'Rate a mobile application': 25,
                'Review a mobile application': 25
            },
            AppleStore: {
                'Download, rate, and review a mobile application': 100,
                'Download a mobile application': 40,
                'Rate a mobile application': 30,
                'Review a mobile application': 30
            },
            BBN: {
                'Vote for someone': 10
            },
            Audiomack: {
                'Follow a profile': 20,
                'Like a song': 15,
                'Stream a song': 30
            },
            Spotify: {
                'Follow a profile': 25,
                'Stream a song': 35
            },
            AppleMusic: {
                'Stream a song': 35
            },
            SoundCloud: {
                'Stream a song': 30
            },
            Review: {
                'Write a website review': 30
            }
        };
    }

    // Modify getPoints to use the platformMapping
    getPoints(platform, task) {
        const platformKey = platformMapping[platform]; // Translate platform name
        if (platformKey && this.tasks[platformKey] && this.tasks[platformKey][task] !== undefined) {
            return this.tasks[platformKey][task];
        } else {
            console.error(`Task not found for platform: ${platform}, task: ${task}`);
            throw new Error('Task not found');
        }
    }
}

// Attach TaskPoints to the window object so it's available globally
window.TaskPoints = TaskPoints;
