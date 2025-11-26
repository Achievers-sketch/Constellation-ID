# Constellation ID

**A decentralized identity system that operates completely offline and syncs via satellite to the blockchain.**

Constellation ID is a forward-thinking application built with Next.js, designed to provide a robust, decentralized identity verification system. It leverages modern web technologies and AI to offer a unique solution that functions seamlessly even in offline environments, with eventual data synchronization via a satellite-to-blockchain pipeline.

## ✨ Key Features

- **Decentralized Identity**: Empowers users with control over their digital identities.
- **Offline-First Verification**: An offline tool to verify identities using QR code data, crucial for environments with limited connectivity.
- **AI-Powered Cost Estimation**: Utilizes Genkit and Google's Gemini AI to estimate the costs of on-chain identity registration based on network conditions.
- **Modern Tech Stack**: Built with Next.js, React, and TypeScript for a type-safe, performant, and scalable application.
- **Sleek UI**: A polished and responsive user interface crafted with ShadCN UI and Tailwind CSS.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - The React Framework for the Web
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at scale
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [ShadCN UI](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS
- [Genkit](https://firebase.google.com/docs/genkit) - A Google framework for building AI-powered applications

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   ```
2. Navigate to the project directory and install NPM packages:
   ```sh
   npm install
   ```

### Running the Application

You can run the development server with:

```sh
npm run dev
```

This will start the Next.js application on `http://localhost:9002`.

### Running Genkit for AI Features

To use the AI-powered features, you'll need to run the Genkit development server in a separate terminal:

```sh
npm run genkit:dev
```

This will start the Genkit development UI, allowing you to inspect and test your AI flows.

## 📂 Project Structure

- `src/app/`: Contains the core application pages and layouts (using Next.js App Router).
- `src/components/`: Houses all the React components, including UI elements from ShadCN.
- `src/ai/`: Holds the Genkit flows and AI-related logic.
- `src/lib/`: Includes utility functions, schemas, and other shared library code.
- `public/`: Stores static assets like images and fonts.
