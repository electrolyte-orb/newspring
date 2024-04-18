# Newspring

Supabase-based messaging app, built upon Next.js

## Routing Structure

```
/             --> (index; no-fetch)                  SSG

-- Unauthenticated only --
/login?err=x  --> (login; redirect if auth; error)   SSR

--  Authenticated only  --
/app          --> (middleware; checks user session)  MDW    done

/app          --> (all contacts; fetch)              SSR    done
/app/:userId  --> (chat; websockets; fetch)          SSR    done
/app/settings --> (settings; fetch)                  SSR    done
```
