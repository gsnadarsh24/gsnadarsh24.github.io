---
title: "Multi-Tenant Security Hardening"
date: 2026-04-01
summary: "Fixed a cross-tenant access flaw in the EMS Admin APIs and put one AOP guard in front of 40+ Petty Cash APIs"
show_date: false
reading_time: false
company: "Zaggle Prepaid Ocean Services"
company_slug: "zaggle"
tags:
  - Backend
  - Security
tech_stack:
  - Java
  - Spring Boot
  - Spring AOP
  - REST APIs
featured: true
role: "Software Engineer"
duration: "Zaggle Prepaid Ocean Services"
highlights:
  - "Closed a cross-tenant flaw in the EMS Admin APIs"
  - "One AOP guard protects 40+ APIs"
---

Two backend security fixes on the Petty Cash and EMS Admin services at Zaggle.

## What I built

- Found a cross-tenant flaw in the EMS Admin petty cash APIs: changing `unitId`, `empEmail`, `policyId` or `categoryId` in a request exposed another client's category limits and let a user edit them.
- Fixed it with `clientId`-scoped repository checks and authorization guards on every unit, employee and policy mapping, so each client can only read and change its own limits.
- Added stricter error handling and wider test coverage, so the same access gap cannot slip back in.
- Built a custom annotation backed by an AOP aspect that blocks Petty Cash endpoints, including replayed calls, whenever the feature flag is off, covering 40+ APIs across the payment and admin services without repeating checks in each controller.
