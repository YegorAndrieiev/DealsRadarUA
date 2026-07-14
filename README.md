# DealsRadarUA 🚀

[![Live Demo](https://img.shields.io/badge/Demo-Live%20On%20Vercel-brightgreen?style=for-the-badge)](https://deals-radar-ua-frontend.vercel.app/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)

**DealsRadarUA** is a high-performance, ad-free, and spam-free real-time deal aggregator. It allows users in Ukraine to instantly search and track product listings across major e-commerce platforms (OLX, Prom, Rozetka) simultaneously, bypassing bloated interfaces, promotional clutter, and sponsored spam.

---

## 📺 Project Demo

> **How it works:** Watch the app stream live search results directly from multiple platforms with skeleton loading and real-time state updates.

https://github.com/user-attachments/assets/YOUR-VIDEO-ID-HERE

---

## 🌟 Key Features

* **Zero Ads & Spam:** Clean, minimalist UI focused purely on finding the best deals without promotional noise or native ad injections.
* **Progressive Loading (Streaming SSR):** Seamless user experience powered by React Suspense. Data is streamed incrementally as soon as each platform responds, eliminating the "all-or-nothing" wait time.
* **Multi-Source Aggregation:** Simultaneous high-speed scraping across OLX, Prom, and Rozetka.
* **Dark Mode Support:** Fully responsive interface with native dark/light theme switching based on a modern design.
* **Production-Ready Scalability:** Strict separation of the Frontend (Next.js on Vercel) and the Backend (Express parser engine on Render) for independent scaling and cost efficiency.

---

## 🛠️ Tech Stack & Architecture

To optimize performance and avoid Vercel's serverless execution limits for background processes, the project's architecture is decoupled into two dedicated environments:

### Frontend
* **Framework:** Next.js
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

### Backend (Parser Engine)
* **Runtime:** Node.js / Express
* **Scraping:** High-performance custom HTTP scrapers
* **Deployment:** Render

---


### 🛡️ Anti-Scraping Bypass & IP Rotation
To scale search request volumes without triggering rate limits or Cloudflare challenges on major marketplaces (especially Rozetka and OLX), the system is ready to implement:
* **Rotating Residential Proxies:** Easy configuration to route backend requests through dynamic proxy pools, ensuring a unique IP for every outgoing search batch.
* **Dynamic Header & User-Agent Spoofing:** Dynamic browser fingerprinting to simulate organic user behavior and prevent scraper detection.

---

## 🚀 Quick Start & Local Deployment

This project is fully containerized using Docker, allowing you to clone the repository and run the entire stack instantly without any manual dependency installation.

### 1. Prerequisites
Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.

### 2. Environment Setup
To run the application locally, you need to set up the configuration scopes. Review the structure and create the following `.env` files:

* **Client Setup:** Create a `.env` file inside the `/client` directory and ensure `NEXT_PUBLIC_API_URL` points to your backend gateway:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:5001/
  ```
* **Server Setup:** Create a `.env` file inside the `/server` directory and define the local development port:
  ```env
  PORT=5000
  ```
  
  > ⚠️ **Important:** You also need to adjust the CORS settings in your server entry file (e.g., `src/index.ts`) for local development. Change the origin to `http://localhost:3000`:
  ```typescript
  app.use(
    cors({
      origin: 'https://deals-radar-ua-frontend.vercel.app', //use for local development: http://localhost:3000
      credentials: true,
    }),
  );
  ```
### 3. Run with Docker
Launch the entire stack (Frontend, Backend) with a single command:

```bash
docker compose up --build


