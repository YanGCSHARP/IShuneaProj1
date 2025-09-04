import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.imagin.studio', 'via.placeholder.com'],
    unoptimized: true, // Добавьте это, если продолжаются проблемы с оптимизацией
  },
}

module.exports = nextConfig