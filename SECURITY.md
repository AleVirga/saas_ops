# Security Policy

## Supported Versions

The following versions of Hellen Plus are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.5.x   | ✅ Yes             |
| < 1.5   | ❌ No              |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue in Hellen Plus, please **do not** open a public GitHub issue, as this could expose users to risk before a fix is available.

Instead, please report it through one of the following channels:

- **Email:** xxx
- **GitHub Private Vulnerability Reporting:** Use [GitHub's private reporting feature](https://github.com/advisories) directly on this repository *(Settings → Security → Report a vulnerability)*.

### What to Include

Please provide as much of the following information as possible to help us understand and resolve the issue quickly:

- A description of the vulnerability and its potential impact
- The affected version(s)
- Step-by-step instructions to reproduce the issue
- Any relevant screenshots, logs, or proof-of-concept code

## What Qualifies as a Vulnerability

Examples of issues we consider security vulnerabilities:

- Cross-site scripting (XSS) via extension content scripts or the side panel
- Improper URL/host validation allowing data exfiltration to unintended hosts
- Leakage of API keys or user authentication tokens
- Unauthorized access to browser tabs or user data
- Privilege escalation through message passing between extension components

## Our Commitment

- We will acknowledge receipt of your report within **48 hours**
- We aim to provide an initial assessment within **5 business days**
- We will keep you informed of our progress toward a fix
- We will credit you in the release notes (unless you prefer to remain anonymous)
- We follow [coordinated vulnerability disclosure](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html) principles

## Scope

This policy applies to the Hellen Plus Chrome extension and its associated backend services at `hellenplus.io`.

It does **not** cover:
- Third-party services or APIs integrated by the user (e.g. OpenAI, Azure, SAP SuccessFactors)
- Vulnerabilities in Chromium or the Chrome Web Store platform itself
