# Swedish BankID OIDC Provider in NestJS
Welcome to the repository of the Swedish BankID OpenID Connect (OIDC) provider built using the NestJS framework. This project uses [node-oidc-provider](https://github.com/panva/node-oidc-provider) and code from [anyfin/bankid](https://github.com/anyfin/bankid/) to establish a seamless integration with BankID, enabling it to be utilized as an Identity Provider (IDP) for your authentication service.

Additionally, the repository contains an example Next app that connects to the OIDC provider using next-auth to demonstrate how it works.

If you have an idea for improvement please raise an issue or create a PR.

## Features
- **OIDC Compliance:** The system supports authorization code, implicit, and hybrid flows to cater to your application's specific needs.
- **BankID RP-API Version 6 compliant (kind of)** Strives to follow the new BankID guideliens in RP-API version 6, meaning no personal number start, QR code support, etc.
- **Free & Customizable** Own your own BankID solution and customize it to your liking. No SaaS required!

![Diagram of how the Node OIDC BankID provider works in a system](/illustration.png)

## BankID Test Certificate
This repository includes the PFX certificate required for authenticating with BankID in their test environment. The cipher of the PFX file has been revised from the previously vulnerable RC2 cipher, which caused Node 18 errors, enhancing its security and overall stability.

## Disclaimer
Use this OIDC provider at your own risk. I am not responsible for the way you use this code or whether or not it is secure/in line with Finasiell ID-teknik's requirements.


## Starting the Nestjs OIDC Provider

In the `nestjs-oidc-provider/` :

1. npm install
2. `npm run start:dev`

Now the OIDC provider is running at localhost:3001

## Starting the NextJs example app

In the `next-app/` directory.

1. Create `.env` file according to `.env.example`
2. npm install
3. npm run dev

Now you can sign in at localhost:3000 to the next app via next-auth with BankID. You must own a test BankID to be able to sign in, get one at [Demobanken](https://demo.bankid.com/).
