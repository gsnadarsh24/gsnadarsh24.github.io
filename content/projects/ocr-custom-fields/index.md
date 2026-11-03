---
title: "Client-Configurable OCR Extraction"
date: 2026-03-15
summary: "Reworked the Java OCR services so each client can have custom fields without any code changes"
show_date: false
reading_time: false
company: "Zaggle Prepaid Ocean Services"
company_slug: "zaggle"
tags:
  - Backend
tech_stack:
  - Java
  - Spring Boot
  - REST APIs
featured: false
role: "Software Engineer"
duration: "Zaggle Prepaid Ocean Services"
highlights:
  - "Custom OCR fields per client, zero code changes"
  - "Detected values stay editable"
---

Backend rework of the OCR extraction flow at Zaggle so clients can define their own fields.

## What I built

- Reworked the Java controller and service layers to fetch global and client-specific OCR field mappings at runtime, replacing the need for code changes for each client.
- Auto-populated detected values into the form while keeping every field editable, so users correct a value instead of retyping it.
- Handled missing data gracefully, so a field that OCR cannot fill no longer breaks submission.
- New clients can now have custom OCR fields set up without engineering work, which speeds up onboarding and leaves existing OCR workflows untouched.
