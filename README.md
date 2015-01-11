## Mermaid plugin for GitBook 
[![Build Status](https://travis-ci.org/JozoVilcek/gitbook-mermaid-plugin.svg?branch=master)](https://travis-ci.org/JozoVilcek/gitbook-mermaid-plugin)

Plugin for [GitBook](https://github.com/GitbookIO/gitbook) which renders [Mermaid](https://github.com/knsv/mermaid) diagrams and flow charts detected in the book markdown.

### How to install it?

You can use install via **NPM**:

```
$ npm install gitbook-mermaid-plugin
```

And use it for your book with in the book.json:

```
{
    "plugins": ["gitbook-mermaid"]
}
```

### How to use it?

Just put the code into fenced code block and tag it **mermaid** key word like this:
```mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```
Plugin will pick it up and pack into properly marked div element, where it can be found by mermaid client side rendering.
