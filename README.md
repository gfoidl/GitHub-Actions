# GitHub-Actions

## PR Title check

![build-test](https://github.com/gfoidl/GitHub-Actions/workflows/pr_title_check/badge.svg) 
[Source](./pr_title_check/)

Verifies the PR-name starts with the given pattern. If not, the a comment is posted to the PR.

### Usage

```yml
on:
  pull_request:
    types:
      - opened
      - edited

jobs:
  pr_title_check:
    runs-on: ubuntu-latest
    steps:
        - uses: gfoidl/GitHub-Actions/pr_title_check
          with:
            message: PR title does not match
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            pattern: '^\[?KEY-\d+\]?\s?'
```

Or specifically for Jira:

```yml
on:
  pull_request:
    types:
      - opened
      - edited

jobs:
  pr_title_check:
    runs-on: ubuntu-latest
    steps:
        - uses: gfoidl/GitHub-Actions/pr_title_check
          with:
            message: PR title does not match
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            matchJira: 1
            checkJiraBranchName: 1
```

Further info in the [declaration](./pr_title_check/action.yml).
