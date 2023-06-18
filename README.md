# dougs-test

Test technique pour Dougs

## Project Structure

- express - Solution using NodeJS 20.3.0 and express
- nest - Solution using NodeJS 20.3.0 and NestJS
- deno - Solution using Deno 1.17.1 and oak
- bun - WIP

## For the express solution

```
cd express
```

You might need NodeJS 20.3.0 since it's using experimental modules (import /
export)

### Installation

```
npm ci
```

### Start WebServer

```
npm start
```

### Run test suites

```
npm test
```

## For the NestJS solution

```
cd nest
```

### Installation

```
npm ci
```

### Start WebServer

```
npm start
```

### Run test suites

```
npm test
```

## For the deno solution

```
cd deno
```

### Start WebServer

```
deno run --allow-net src/main.ts
```

### Run test suites

```
deno test
```
