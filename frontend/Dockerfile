# frontendディレクトリで`docker build -f Dockerfile ../`
# カレントディレクトリはfrontendではなく、プロジェクトのルートディレクトリであることに注意
FROM node:20

WORKDIR /app

COPY ./frontend/package*.json ./
COPY ./frontend/pnpm-lock.yaml ./

COPY ./common /common
COPY ./frontend ./

ENV SHELL /bin/bash
RUN curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=8.6.12 sh -
ENV PATH="/root/.local/share/pnpm:$PATH"
RUN pnpm install --frozen-lockfile

EXPOSE 8000

RUN pnpm run build

CMD ["pnpm", "run", "preview"]
