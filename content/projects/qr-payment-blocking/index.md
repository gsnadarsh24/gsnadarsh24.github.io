---
title: "Spend-Based QR Payment Blocking"
date: 2026-03-01
summary: "Real-time control that auto-blocks QR payments once a client's daily spend limit is reached, capping payout risk for ~1,700 users"
show_date: false
reading_time: false
company: "Zaggle Prepaid Ocean Services"
company_slug: "zaggle"
tags:
  - Backend
  - Full-Stack
  - Fintech
tech_stack:
  - Java
  - Spring Boot
  - PostgreSQL
  - REST APIs
featured: true
role: "Software Engineer"
duration: "Zaggle Prepaid Ocean Services"
highlights:
  - "Capped payout risk for ~1,700 users"
  - "Bulk limit setup across clients via REST API"
  - "Schema supports weekly and monthly limits with no data-model changes"
---

A real-time control built at Zaggle that automatically blocks QR payments when a client reaches its daily spend limit.

## What I built

- A cumulative spend-based check that blocks QR payments in real time once a client's daily limit is hit, capping payout risk for ~1,700 users.
- A REST API for bulk limit setup across clients, with validation, per-client errors and a full audit trail.
- A frequency-driven schema, so weekly and monthly limits can be added later without changing the data model.
