---
title: "Petty Cash Performance Metrics Dashboard"
date: 2026-02-01
summary: "Full-stack dashboard giving leadership date-range views of tenants, users, payment volume and success rate in one screen"
show_date: false
reading_time: false
company: "Zaggle Prepaid Ocean Services"
company_slug: "zaggle"
tags:
  - Full-Stack
  - Frontend
  - Fintech
tech_stack:
  - React.js
  - Redux
  - Java
  - Spring Boot
  - PostgreSQL
featured: true
role: "Software Engineer"
duration: "Zaggle Prepaid Ocean Services"
highlights:
  - "Replaced repetitive ad-hoc SQL data requests"
  - "Internal test accounts excluded from all production metrics"
---

A metrics dashboard for the Petty Cash team that replaced repetitive ad-hoc SQL data requests.

## What I built

- A full-stack dashboard showing active tenants, onboarded users, payment volume and success rate over any date range, all on one screen.
- Trustworthy figures: internal test accounts are excluded from every production metric.
- Built an idempotent, single-read and single-write backfill API that groups transactions by `txnId` and resolves the right `expenseId`, linking **78+ DEBIT transactions** to their expenses and restoring reconciliation integrity for clients migrated to manual expense creation.