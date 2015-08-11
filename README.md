## Mermaid plugin for GitBook 
[![Build Status](https://travis-ci.org/JozoVilcek/gitbook-plugin-mermaid.svg?branch=master)](https://travis-ci.org/JozoVilcek/gitbook-plugin-mermaid)
[![NPM version](https://badge.fury.io/js/gitbook-plugin-mermaid.svg)](http://badge.fury.io/js/gitbook-plugin-mermaid)

Plugin for [GitBook](https://github.com/GitbookIO/gitbook) which renders [Mermaid](https://github.com/knsv/mermaid) diagrams and flow charts detected in the book markdown.

### How to install it?

You can use install via **NPM**:

```
$ npm install gitbook-plugin-mermaid
```

And use it for your book with in the book.json:

```
{
    "plugins": ["mermaid"]
}
```

### How to use it?

Include graph in your book as:
```
{% mermaid %}
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
{% endmermaid %}
```
Plugin will pick up the block and replace it with generated svg.
