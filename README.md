# Micro-Commerce Full-stack Scaffold

This archive contains a simplified full-stack scaffold for the Micro-Commerce assessment.

Folders:
- server/ : NestJS backend (SQLite)
- mobile/ : Expo React Native app

Follow each folder's README for setup.

Limitations:
- Admin guard not implemented in scaffold; add guards in production.
- Inventory deduction is not fully transactional (simplified). For high concurrency use DB transactions/locks.

Enjoy!
