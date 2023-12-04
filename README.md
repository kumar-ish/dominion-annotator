# Dominion Online ([dominion.games](https://dominion.games)) Annotator

This is a Chrome extension built to easily view and filter cards that have one of the special card properties of the board game Dominion.

## Scraper

> Note that this is unnecessary to run the extension as a cached `cards.json` file already exists in `src/`

A Python scraper for the Wikimedia page containing all the card properties exists in the root of this directory. You can simply run it with `python3 scraper.py` (note that you need to install `bs4`).

## Quick Start

First, install the dependencies (note that you may wish to use `npm` or `yarn`):

```bash
pnpm install
```

Next, build the extension:

```bash
pnpm run build
```

Finally, load the extension into Chrome:

Open Chrome and navigate to `chrome://extensions/`.

- Enable "Developer mode".
- Click "Load unpacked".
- Select the `dist` folder from the cloned repository.
- The extension should now be loaded and running in your browser.

## Development

To start a development server with hot reloading, run the following command:

```bash
pnpm run dev
```

This will automatically compile the extension whenever changes are made to the code.

## Deployment

To build the extension for production, run the following command:

```bash
pnpm run build
```

The optimized and bundled extension will be placed in the dist folder, ready for deployment.
