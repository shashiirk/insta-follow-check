# insta-follow-check

A clean, dependency-light Node.js CLI tool that analyzes your **Instagram data export** to show:

- Who doesn’t follow you back
- Who you don’t follow back
- Your mutual followers

It works directly with Instagram’s **JSON export files**, supports multiple `followers_*.json` and `following_*.json` files, and outputs clean, structured results right in your terminal — no API calls, no login.

## Installation

### Using npm (recommended)

    npm install -g insta-follow-check

### Using npx (no installation needed)

    npx insta-follow-check -d ./instagram-data

## Usage

The required JSON files are located in this folder inside your Instagram export:

    connections/followers_and_following/

This folder typically contains files like:

    followers_1.json
    followers_2.json
    following.json
    following_1.json

Run the CLI by pointing it to that folder:

    insta-follow-check -d ./path/to/instagram-data/connections/followers_and_following

## Example Output

    =============================
      INSTAGRAM FOLLOW CHECKER
    =============================

    Total Followers: 230
    Total Following: 315

    ──────────────────────────────
    Not Following You Back (85)
    ──────────────────────────────
    user1
    user2
    user3
    ...

    ──────────────────────────────
    You Don't Follow Back (0)
    ──────────────────────────────
    (none)

    ──────────────────────────────
    Mutual Followers (230)
    ──────────────────────────────
    userA
    userB
    ...

## Features

- Works with Instagram’s **real export structure** (`connections/followers_and_following/*.json`)
- Supports **multiple files** automatically
- No external APIs or authentication required
- Minimal, readable terminal output
- Built with Node.js and `commander`

## CLI Options

| Flag            | Description                        | Default |
| --------------- | ---------------------------------- | ------- |
| `-d, --dataDir` | Path to your Instagram JSON folder | `.`     |

Example:

    insta-follow-check -d ~/Downloads/instagram-data/connections/followers_and_following

## License

[MIT](./LICENSE)

## Links

- **NPM:** [https://www.npmjs.com/package/insta-follow-check](https://www.npmjs.com/package/insta-follow-check)
- **GitHub:** [https://github.com/shashiirk/insta-follow-check](https://github.com/shashiirk/insta-follow-check)

## Support

If you find this useful, consider starring the repo on GitHub.
