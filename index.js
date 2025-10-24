#!/usr/bin/env node
import fs from 'fs';
import { program } from 'commander';
import path from 'path';

program
  .name('insta-follow-check')
  .description(
    'Find who does not follow you back on Instagram (Instagram Data Export compatible)'
  )
  .option(
    '-d, --dataDir <path>',
    'Path to directory containing Instagram followers_and_following files',
    '.'
  )
  .parse(process.argv);

const options = program.opts();

// Read followers from followers*.json
function loadFollowers(dirPath) {
  const followers = new Set();
  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.startsWith('followers') && f.endsWith('.json'));

  if (files.length === 0) {
    console.error(
      'Error: No followers*.json files found in the given directory.'
    );
    process.exit(1);
  }

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dirPath, file), 'utf-8'));
    for (const entry of data) {
      try {
        const username = entry.string_list_data[0].value.toLowerCase();
        if (username) followers.add(username);
      } catch {}
    }
  }
  return followers;
}

// Read following from following.json or following*.json
function loadFollowing(dirPath) {
  const following = new Set();
  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.startsWith('following') && f.endsWith('.json'));

  if (files.length === 0) {
    console.error(
      'Error: No following*.json files found in the given directory.'
    );
    process.exit(1);
  }

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dirPath, file), 'utf-8'));
    const list = data.relationships_following;
    for (const entry of list) {
      try {
        const username = entry.title.toLowerCase();
        if (username) following.add(username);
      } catch {}
    }
  }
  return following;
}

// Load and process data
const followers = loadFollowers(options.dataDir);
const following = loadFollowing(options.dataDir);

// Compare sets
const notFollowingBack = [...following].filter((u) => !followers.has(u)).sort();
const notFollowedByMe = [...followers].filter((u) => !following.has(u)).sort();
const mutuals = [...following].filter((u) => followers.has(u)).sort();

// ──────────────────────────────
// Output Formatting
// ──────────────────────────────
function printSection(title, count, list) {
  console.log('──────────────────────────────');
  console.log(`${title} (${count})`);
  console.log('──────────────────────────────');
  if (list.length === 0) {
    console.log('(none)\n');
  } else {
    for (const user of list) console.log(user);
    console.log();
  }
}

console.log('\n=============================');
console.log('  INSTAGRAM FOLLOW CHECKER');
console.log('=============================\n');

console.log(`Total Followers: ${followers.size}`);
console.log(`Total Following: ${following.size}\n`);

printSection(
  'Not Following You Back',
  notFollowingBack.length,
  notFollowingBack
);
printSection("You Don't Follow Back", notFollowedByMe.length, notFollowedByMe);
printSection('Mutual Followers', mutuals.length, mutuals);
