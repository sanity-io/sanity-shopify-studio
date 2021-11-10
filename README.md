# Sanity Studio for Shopify Projects

- [About](#about)
- [Features](#features)
  - [Shopify friendly content schemas](#shopify-friendly-content-schemas)
  - [Desk structure](#desk-structure)
  - [Custom document actions](#custom-document-actions)
  - [Delete product and variants](#delete-product-and-variants)
  - [Edit in Shopify shortcut](#edit-in-shopify-shortcut)
  - [Bundled custom input components](#bundled-custom-input-components)
- [Setup](#setup)
- [Local Development](#local-development)
  - [Starting development server](#starting-development-server)
  - [Deploying the studio](#deploying-the-studio)
  - [Upgrading Sanity Studio](#upgrading-sanity-studio)
- [License](#license)

## About

This Sanity Studio is configured for headless Shopify projects that use the [Sanity Shopify application][sanity-shopify]. It will let you augment extend product information with additional content, as well as integrate products with editoral content. This studio also contains example of customization of the [desk-structure][desk-structure], [document actions][document-actions], as well as [input components][input-components].

This studio can be used with our [Hydrogen starter][hydrogen-demo], your own frontend, or anywhere else you else your e-commerce content to go.

## Features

### Shopify friendly content schemas

This studio is built to accomodate product information coming from a Shopify Store. You can use the [Saniy Shopify app][sanity-shopify] to sync your product information, add content on top of it and integrate with editorial content. The content will be available over APIs that you can use with a

Inside `/schemas` you'll find schema definitions for all the content types. They are organized in folders:

- `/schemas/annotations/`: Annotations let editors mark up text in the block content editor with rich objects. These can be used to agument editorial content with product information. It also uses referential integrity to keep you from unwillingly delete a product that's used in editorial content.
- `/schemas/documents/`: Document types determines the shape of the JSON documents that's stored in your content lake. This is where you define the content forms for things like products, collections, variants, as well as articles.
- `/schemas/objects/`:

### Desk structure

Sanity Studio will automatically list all your [document types][document-types] out of the box. Sometimes you want a more streamlined editor experience. That's why you'll find a custom [desk-structure][desk-structure] that's defined in `/deskStructure.js`. It does the following things:

- Groups product information and variants by individual products for more conveinent editing
- Creates a singleton document for controlling a homepage with featured products and collections, and a gallery
- Creates a singleton document for settings to control naviagation and global content
- Lists article types for information and for editorial content

### Custom document actions

Custom document actions let you override the default behavior of the publish button. The included document actions adds to the menu that you can find by pushing the chevron right to a document's publish button.

You can find custom document actions in `/documentActions/`.

### Delete product and variants

`/documentActions/deleteProductAndVariants.tsx`

This custom document action lets you delete a product documet including all its variants in your Sanity Content Lake. Without this document action, one would have to delete all variant document one-by-one.

### Edit in Shopify shortcut

`/documentActions/shopifyLink.ts`

This creates a shortcut to edit the current product in Shopify.

### Bundled custom input components

## Setup

If you're reading this on GitHub, chances are you haven't initialized the studio locally yet. To do so, run one of these shell commands:

```sh
# run a one-off initializing script:
npx @sanity/cli init --template shopify

# or install the Sanity CLI globally on your machine

npm i -g @sanity/cli && sanity init --template shopify
```

## Local Development

### Starting development server

```sh
npm start
```

### Deploying the studio

```sh
npm run deploy
```

### Upgrading Sanity Studio

```sh
npm run upgrade
```

If you have the [Sanity CLI][sanity-cli] installed, you can also run thes with `sanity start|deploy|upgrade`. It comes with additional useful functionality.

## License

This repository is published under the [MIT](license) license.

[custom-input-components]: https://www.sanity.io/docs/custom-input-components
[desk-structure]: https://www.sanity.io/docs/structure-builder
[document-actions]: https://www.sanity.io/docs/custom–document-actions
[document-types]: https://www.sanity.io/docs/
[hydrogen-demo]: https://github.com/sanity-io/hydrogen-sanity-demo
[license]: https://github.com/sanity-io/sanity/blob/next/LICENSE
[sanity-cli]: https://www.sanity.io/docs/cli
[sanity-shopify]: https://shopify.com/marketplace
