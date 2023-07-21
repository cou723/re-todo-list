# backend

## development

### Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Installation

```bash
$ pnpm install
$ touch db.sqlite
```

### Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run dev

# production mode
$ pnpm run start:prod
```

### Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

### Git Commit Message 

iを使用しています

## サービス内容

### 言語定義
- タスク: Task

### 機能
- タスク
  - 追加
  - 取得
    - 一覧取得
    - 個別取得
  - 編集
    - 完了化
    - 全編集化
    - 非完了化
    - 親追加
    - 親削除
  - 削除

### データ構造
#### ユーザー: User
- id: INTEGER
- username: TEXT
- password: BLOB

#### タスク: Task
- name:task
  - id: INTEGER
  - created_by: INTEGER
  - title: TEXT
  - description: TEXT
  - is_done: INTEGER(0,1)
  - path: TEXT

### エンドポイント


| path        | method | 効果                     |
| :---------- | :----- | :----------------------- |
| /auth/login | POST   |                          |
| /logout     | POST   |                          |
| /user/new       | POST   | ユーザーを新しく作成する |
| /user       | DELETE | ユーザーを削除する       |

| path             | method | 効果                       |
| :--------------- | :----- | :------------------------- |
| /task            | POST   | タスクを追加する           |
| /task/list       | GET    | タスク一覧を返す           |
| /task/:id        | GET    | 特定のタスク一つを取得する |
| /task/:id/done   | POST   | タスクを完了状態にする     |
| /task/:id        | POST   | タスクを編集する           |
| /task/:id/undone | POST   | タスクを非完了状態にする   |
| /task/:id/parent | POST   | タスクに親を追加する       |
| /task/:id/parent | DELETE | タスクから親を削除する     |
| /task/:id        | DELETE | 特定のタスクを削除する     |

※Content-Type: application/jsonは必須

#### /user/login

##### body
```ts
{
  "username":TEXT,
  "password":TEXT
}
```

##### Response
- 失敗時
  - ユーザーが存在しない: `401, User not found`
  - パスワードが間違っている: `401, Password is wrong`

#### /user/newa

##### body
```ts
{
  "username":TEXT,
  "password":TEXT
}
```

##### Response
- 失敗時
  - すでに同名のユーザーが存在する: `409, User already exists`
  - 使用できない文字が含まれている: `400, Invalid character`

#### /task

##### body
```ts
{
  "title":TEXT,
  "description":TEXT,
  "path"?: TEXT
}
```

##### Response 
- 失敗時
  - is_doneが0,1以外: `400, Invalid is_done`
  - pathが不正: `400, Invalid path`

#### /task/list

##### Response

###### 成功時
```ts
[
  {
    "id":INTEGER,
    "title":TEXT,
    "description":TEXT,
    "is_done": 0|1,
    "path": TEXT
  },
  ...
]
```

#### /task/:id

##### Response

###### 成功時
```ts
{
  "id":INTEGER,
  "title":TEXT,
  "description":TEXT,
  "is_done": 0|1,
  "path": TEXT
}
```

###### 失敗時
  - idが存在しない: `404, Task not found`
  - 権限が存在しない: `403, Permission denied`
  - 編集に失敗した: `500, Failed to edit`

#### /task/:id

##### body
```ts
{
  "title":TEXT,
  "description":TEXT,
  "is_done": 0|1,
  "path": TEXT
}
```

##### Response
- 失敗時
  - idが存在しない: `404, Task not found`
  - 権限が存在しない: `403, Permission denied`
  - 編集に失敗した: `500, Failed to edit`

#### /task/:id/done 

##### body
```ts
{}
```

##### Response
- 失敗時
  - idが存在しない: `404, Task not found`
  - 権限が存在しない: `403, Permission denied`
  - 編集に失敗した: `500, Failed to edit`
  - タスクがすでに完了している: `400, Task is already done`

#### /task/:id/undone 

##### body
```ts
{}
```

##### Response
- 失敗時
  - idが存在しない: `404, Task not found`
  - 権限が存在しない: `403, Permission denied`
  - 編集に失敗した: `500, Failed to edit`
  - タスクがすでに未完了している: `400, Task is already undone`


#### /task/:id/parent

##### body
```ts
{
  "parent_id":
}
```

##### Response
- 失敗時
  - idが存在しない: `404, Task not found`
  - 権限が存在しない: `403, Permission denied`
  - 編集に失敗した: `500, Failed to edit`
  - parent_idが存在しない: `404, Parent task not found`

## License


Nest is [MIT licensed](LICENSE).
