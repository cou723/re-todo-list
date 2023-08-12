cd ../common
pnpm install
pnpm run build
cd ../app
pnpm install
pnpm run test
pnpm run test:e2e