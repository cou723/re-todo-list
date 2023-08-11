# backendディレクトリで`docker build -f Dockerfile ../`
# このファイルでのカレントディレクトリ(./)はbackendではなく、プロジェクトのルートディレクトリであることに注意

# In the `backend` directory `docker build -f Dockerfile . /`
# Note that the current directory in this file (. /) is the root directory of the project, not the `backend`

FROM node:20

WORKDIR /app

COPY ./backend/package*.json ./
COPY ./backend/pnpm-lock.yaml ./

COPY ./common /common
COPY ./backend ./

ENV SHELL /bin/bash
RUN curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=8.6.12 sh -
ENV PATH="/root/.local/share/pnpm:$PATH"

WORKDIR /common
RUN pnpm install
RUN pnpm run build
WORKDIR /app

RUN pnpm install --frozen-lockfile

EXPOSE 8000

CMD ["pnpm", "start"]
