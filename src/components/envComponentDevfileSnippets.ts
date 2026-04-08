/** Representative devfile v2 `components` snippet per environment component id. */

const COMPONENT_IMAGES: Record<string, string> = {
  'java-11': 'registry.access.redhat.com/ubi8/openjdk-11:latest',
  'java-17': 'registry.access.redhat.com/ubi8/openjdk-17:latest',
  'java-21': 'registry.access.redhat.com/ubi8/openjdk-21:latest',
  'python-39': 'docker.io/library/python:3.9-bookworm',
  'python-310': 'docker.io/library/python:3.10-bookworm',
  'python-311': 'docker.io/library/python:3.11-bookworm',
  'python-312': 'docker.io/library/python:3.12-bookworm',
  'python-313': 'docker.io/library/python:3.13-bookworm',
  'node-18': 'docker.io/library/node:18-bookworm',
  'node-20': 'docker.io/library/node:20-bookworm',
  'node-22': 'docker.io/library/node:22-bookworm',
  'node-23': 'docker.io/library/node:23-bookworm',
  'go-121': 'docker.io/library/golang:1.21-bookworm',
  'go-122': 'docker.io/library/golang:1.22-bookworm',
  'go-123': 'docker.io/library/golang:1.23-bookworm',
  'rust-stable': 'docker.io/library/rust:1-bookworm',
  'rust-nightly': 'docker.io/rustlang/rust:nightly-bookworm',
  'dotnet-6': 'mcr.microsoft.com/dotnet/sdk:6.0',
  'dotnet-8': 'mcr.microsoft.com/dotnet/sdk:8.0',
  'dotnet-9': 'mcr.microsoft.com/dotnet/sdk:9.0',
  'ruby-31': 'docker.io/library/ruby:3.1-bookworm',
  'ruby-32': 'docker.io/library/ruby:3.2-bookworm',
  'ruby-33': 'docker.io/library/ruby:3.3-bookworm',
  'php-82': 'docker.io/library/php:8.2-cli-bookworm',
  'php-83': 'docker.io/library/php:8.3-cli-bookworm',
  'php-84': 'docker.io/library/php:8.4-cli-bookworm',
  'kotlin-2': 'docker.io/library/gradle:8-jdk21',
  'swift-5': 'docker.io/library/swift:5.10-bookworm',
  'typescript-5': 'docker.io/library/node:22-bookworm',
  'cpp-gcc': 'docker.io/library/gcc:13-bookworm',
  'cpp-llvm': 'docker.io/silkeh/clang:18',
  'scala-3': 'docker.io/library/eclipse-temurin:21-jdk-jammy',
  'elixir-116': 'docker.io/library/elixir:1.16-otp-26',
  'deno-2': 'docker.io/denoland/deno:2',
  'bun-1': 'docker.io/oven/bun:1',
  clojure: 'docker.io/library/clojure:latest',
  'haskell-ghc': 'docker.io/library/haskell:latest',
  'perl-538': 'docker.io/library/perl:5.38-bookworm',
  'r-4': 'docker.io/rocker/r-ver:4',
  'julia-110': 'docker.io/library/julia:1.10-bookworm',
  'erlang-26': 'docker.io/library/erlang:26',
  'dart-3': 'docker.io/library/dart:3',
  'flutter-3': 'ghcr.io/cirruslabs/flutter:stable',
  'docker-engine': 'docker.io/library/docker:24-dind',
  kubernetes: 'docker.io/bitnami/kubectl:latest',
  'postgres-15': 'docker.io/library/postgres:15',
  'postgres-16': 'docker.io/library/postgres:16',
  'postgres-17': 'docker.io/library/postgres:17',
  'redis-7': 'docker.io/library/redis:7-bookworm',
  'mongo-6': 'docker.io/library/mongo:6',
  'mongo-7': 'docker.io/library/mongo:7',
  'mysql-8': 'docker.io/library/mysql:8',
  'mariadb-11': 'docker.io/library/mariadb:11',
  'sqlite-3': 'docker.io/library/alpine:3',
  'rabbitmq-3': 'docker.io/library/rabbitmq:3-management',
  'kafka-3': 'docker.io/bitnami/kafka:3',
  nginx: 'docker.io/library/nginx:alpine',
  'terraform-1': 'docker.io/hashicorp/terraform:1',
  cmake: 'docker.io/kitware/cmake:3.30',
  'gradle-8': 'docker.io/library/gradle:8-jdk21',
  'maven-3': 'docker.io/library/maven:3-eclipse-temurin-21',
  'bash-5': 'docker.io/library/debian:bookworm-slim',
}

export function getDevfileSnippetForComponent(id: string, displayName: string): string {
  const image = COMPONENT_IMAGES[id]
  const name = id.replace(/[^a-z0-9-]/gi, '-')
  const img = image ?? `quay.io/devspaces/udi:latest  # ${displayName}`
  return `components:
  - name: ${name}
    container:
      image: ${img}
`
}
