# Stack Auth + Neon Auth

## on dev, implement
- [x] new GitHub oauth app
- [ ] protect routes for /lab
- [ ] auth provider on root layout
- [ ] on sign in, force redirect to /lab
- [ ] conditionally render account avatar (if exists)
- [ ] conditionally render signed in | signed out nav
- [ ] conditionally render signed in | signed out footer

## if adopting, do
- [ ] implement prod auth wall in vercel

## resources

- [quick start](https://docs.stack-auth.com/getting-started/setup)
- [protected routes](https://docs.stack-auth.com/guides/protected-routes)


## Neon Auth

No issues encountered

## Stack Auth

### likes

- easy sign-in component generation
- easy integration with Neon Auth

### dislikes

- GitHub oauth app is still owned by personal account of Stack Auth founder
- browser launch on succesful npx install is unnecessary demoware feature imo
- Handler name is too generic, possible too abstracted
- npx install automically updates layout.tsx
- no SignOut | SignedIn | SignedOut components
- StackTheme applied to layout.tsx during npx install is unnecessary and unwelcome
- no mention of changing GitHub oauth app to my oauth app
- protected routes docs are a little buried
- force redirect after login | signup | logout is buried in `urls: {key: value}` of app objects
- shared email server by default
- account settings are buried in /handler/account-settings
- custom email SMTP docs are non-existent and placed on the user to figure out

### decision

- will not adopt until GitHub oauth app is updated to Stack Auth org
- will not adopt until SignOut | SignedIn | SignedOut components are implemented
- will not adopt until org email domain is implemented and easier to configure
- will not adopt until styling components is easier to implement to bring on brand with existing app
