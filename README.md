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

## API

Glutton accepts page parameters.

### s

Base64 encoded string, including server address and secret. Glutton will try to connect the server on startup.

Format: `link||[secret]`

Example:

```javascript
window.btoa('http://192.168.1.1:6800/jsonrpc||secret')
// "aHR0cDovLzE5Mi4xNjguMS4xOjY4MDAvanNvbnJwY3x8c2VjcmV0"
```

Visit the link below, connect to the specific server:

```
http://nemoalex.github.io/glutton/?s=aHR0cDovLzE5Mi4xNjguMS4xOjY4MDAvanNvbnJwY3x8c2VjcmV0
```

## Development

In project folder:

```
npm install
npm run dev
```

## Contribution

If you like to improve it with me, PRs are always welcome.
