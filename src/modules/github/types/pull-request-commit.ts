export interface PullRequestCommit {
  sha: string
  node_id: string
  commit: Commit
  url: string
  html_url: string
  comments_url: string
  author: Author
  committer: Committer
  parents: Parent[]
}

export interface Commit {
  author: Author
  committer: Committer
  message: string
  tree: Tree
  url: string
  comment_count: number
  verification: Verification
}

export interface Author {
  name: string
  email: string
  date: string
}

export interface Committer {
  name: string
  email: string
  date: string
}

export interface Tree {
  sha: string
  url: string
}

export interface Verification {
  verified: boolean
  reason: string
  signature: string
  payload: string
}

export interface Parent {
  sha: string
  url: string
  html_url: string
}
