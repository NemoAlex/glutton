# Glutton

A ~~next~~ current generation web client for [aria2](http://aria2.github.io/).

[Live Demo](http://nemoalex.github.io/glutton/)

## Basic Usage

Download the release package, open `index.html` in your web browser.

For production use, only files in `dist` folder are required.

## Browser Support

Any morden browser, I guess. If you experience any problem, issue reports are always welcome.

## aria2 Version

Since `--rpc-passwd` option will be deprecated in the future of aria2, Glutton doesn't support it too.

I suggest to use `--rpc-secret` instead, which support by aria2 1.18.4 or higher.

## Development

In project folder:

```
npm install
npm run dev
```

Right now this project is really simple and crude. But if you like to improve it with me, PRs are always welcome.
