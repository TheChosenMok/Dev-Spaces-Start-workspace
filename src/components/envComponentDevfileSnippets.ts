/** Representative devfile v2 `components` snippet per environment component id. */

export interface DevfileSnippetEnvVar {
  name: string
  value: string
}

export interface DevfileSnippetEndpoint {
  /** Display name; if blank after trim, defaults to `http-<targetPort>` in YAML. */
  name: string
  targetPort: number
}

/** References a `volume` component name elsewhere in the devfile (e.g. `projects`, `m2`). */
export interface DevfileSnippetVolumeMount {
  name: string
  path: string
}

export interface DevfileSnippetOptions {
  env?: DevfileSnippetEnvVar[]
  endpoints?: DevfileSnippetEndpoint[]
  volumeMounts?: DevfileSnippetVolumeMount[]
  /** Kubernetes-style quantity, e.g. `2Gi`, `512Mi`. Omitted if blank. */
  memoryLimit?: string
  memoryRequest?: string
  cpuLimit?: string
  cpuRequest?: string
  /** When `false`, emits `mountSources: false`. When `true` or omitted, field is omitted (devfile default is true). */
  mountSources?: boolean
  /** Container path where project sources are mounted when `mountSources` is true. */
  sourceMapping?: string
}

function yamlDoubleQuotedString(s: string): string {
  return `"${s
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')}"`
}

/** Unquoted when safe; otherwise double-quoted (Devfile / YAML 1.2 friendly). */
function yamlScalar(s: string): string {
  if (s === '') return '""'
  if (/^(true|false|null|~)$/i.test(s)) return yamlDoubleQuotedString(s)
  if (/^[\w./-]+$/.test(s)) return s
  return yamlDoubleQuotedString(s)
}

function endpointYamlName(displayName: string, targetPort: number): string {
  const t = displayName.trim()
  if (t) return t
  return `http-${targetPort}`
}

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

export function getDevfileSnippetForComponent(
  id: string,
  displayName: string,
  options?: DevfileSnippetOptions,
): string {
  const image = COMPONENT_IMAGES[id]
  const name = id.replace(/[^a-z0-9-]/gi, '-')
  const img = image ?? `quay.io/devspaces/udi:latest  # ${displayName}`

  const env = (options?.env ?? []).filter((e) => e.name.trim() !== '')
  const endpoints = (options?.endpoints ?? []).filter(
    (e) => Number.isInteger(e.targetPort) && e.targetPort >= 1 && e.targetPort <= 65535,
  )
  const volumeMounts = (options?.volumeMounts ?? []).filter(
    (v) => v.name.trim() !== '' && v.path.trim() !== '',
  )

  const memoryLimit = options?.memoryLimit?.trim()
  const memoryRequest = options?.memoryRequest?.trim()
  const cpuLimit = options?.cpuLimit?.trim()
  const cpuRequest = options?.cpuRequest?.trim()
  const sourceMapping = options?.sourceMapping?.trim()

  const lines = [`components:`, `  - name: ${name}`, `    container:`, `      image: ${img}`]

  if (options?.mountSources === false) {
    lines.push(`      mountSources: false`)
  }

  if (sourceMapping) {
    lines.push(`      sourceMapping: ${yamlScalar(sourceMapping)}`)
  }

  if (memoryLimit) {
    lines.push(`      memoryLimit: ${yamlScalar(memoryLimit)}`)
  }
  if (memoryRequest) {
    lines.push(`      memoryRequest: ${yamlScalar(memoryRequest)}`)
  }
  if (cpuLimit) {
    lines.push(`      cpuLimit: ${yamlScalar(cpuLimit)}`)
  }
  if (cpuRequest) {
    lines.push(`      cpuRequest: ${yamlScalar(cpuRequest)}`)
  }

  if (env.length > 0) {
    lines.push(`      env:`)
    for (const e of env) {
      lines.push(`        - name: ${yamlScalar(e.name.trim())}`)
      lines.push(`          value: ${yamlScalar(e.value)}`)
    }
  }

  if (endpoints.length > 0) {
    lines.push(`      endpoints:`)
    for (const e of endpoints) {
      const epName = endpointYamlName(e.name, e.targetPort)
      lines.push(`        - name: ${yamlScalar(epName)}`)
      lines.push(`          targetPort: ${e.targetPort}`)
      lines.push(`          exposure: public`)
    }
  }

  if (volumeMounts.length > 0) {
    lines.push(`      volumeMounts:`)
    for (const v of volumeMounts) {
      lines.push(`        - name: ${yamlScalar(v.name.trim())}`)
      lines.push(`          path: ${yamlScalar(v.path.trim())}`)
    }
  }

  return `${lines.join('\n')}\n`
}
