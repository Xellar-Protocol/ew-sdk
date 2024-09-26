![Xellar SDK Version](https://img.shields.io/badge/XellarSDK-v1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Key Components

### 🌐 Embedded Wallets

Xellar's Embedded Wallets are self-custodial wallets that can be seamlessly integrated into your application, eliminating the need for separate wallet clients like browser extensions or mobile apps.

### 💱 Xellar Convert

An on/off ramp API for direct buy and sell experiences within your application, facilitating easy and secure transactions.

## Use Cases

Xellar DevKit is versatile and can be implemented in various scenarios, including:

1. 🎮 In-game wallets (mobile and web)
2. 🌍 Community-based apps
3. 💹 Exchange wallets
4. 💸 Remittance-based wallets
5. 🏦 Custodial wallet systems

## Getting Started 🚀

To start using the Xellar SDK, follow these steps:

1. **Install the SDK:**
   ```bash
   npm install xellar-sdk
   ```

2. **Import and initialize the SDK:**
   ```typescript
   import XellarSDK from 'xellar-sdk';

   const xellar = new XellarSDK('YOUR_CLIENT_SECRET', 'BASE_URL');
   ```

3. **Use the SDK's features:**

   - **Login with email:**
     ```typescript
     const verificationToken = await xellar.auth.email.loginWithEmail('user@example.com');
     ```

   - **Verify email:**
     ```typescript
     const result = await xellar.auth.email.verifyEmail(verificationToken, 'OTP_CODE');
     ```

For more detailed implementation guides and API references, please visit our [official documentation](https://docs.xellar.co/).

## Support 📞

For further assistance, contact us:

- 📧 Email: support@xellar.co
- 📱 Telegram: @xellarsupport

## About Xellar 🌟

At Xellar, we're focused on pushing the boundaries of technology to simplify the Web3 experience into a familiar Web2 manner. Our DevKit provides developers with the tools needed to create seamless blockchain-integrated applications.

For more information, visit [https://docs.xellar.co/](https://docs.xellar.co/).
