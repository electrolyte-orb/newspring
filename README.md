# Newspring

Supabase-based messaging app, built upon Next.js

## Routing Structure

```
/             --> (index; no-fetch)                  SSG

-- Unauthenticated only --
/login        --> (login; redirect if auth)          SSR

--  Authenticated only  --
/app          --> (middleware; checks user session)  MDW

/app          --> (all contacts; fetch)              SSR
/app/:userId  --> (chat; websockets; fetch)          SSR
/app/settings --> (settings; fetch)                  SSR
```
