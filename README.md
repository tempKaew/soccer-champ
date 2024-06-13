# Soccer Champ

## Stack details

- Written in [TypeScript](https://www.typescriptlang.org/)
- [Chakra UI](https://chakra-ui.com/) for component library
- [Supabase](https://supabase.com/) for data persistence
- [Prisma](https://www.prisma.io/) for ORM
- [NextAuth](https://next-auth.js.org/) for authentication via GitHub

## Deploy your own

### 1. Download and install dependencies

Run the follow three commands to clone this repo and install its dependencies:

```cmd
git clone https://github.com/tempKaew/soccer-champ.git
cd soccer-champ
bun
```

-Set up the environment variables:

```cmd
cp .env.example .env
```

### 2. Create and seed the database

Open .env and set the SUPABASE_URL and SUPABASE_KEY variable with the connection string from Supabase
Create the database schema:

```cmd
bun prisma db push
```

### 3. Line developers Setup

### 4. Start the app

```cmd
bun dev
```
