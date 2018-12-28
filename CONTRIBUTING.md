# Contributing

In this document, we'll describe how we are dealing with the development of two major versions.

### Development

The major 0 follows the default flow. Open feature branches from master, and open PRs to it. Publish new versions of major 0 in your feature branch. After released, merge it to master.

### Upgrading major 1

Now it's time to update the `1.x` branch. There's always two commits ahead of branch master: one with the update and another with the release commit. We will always keep it short to two commits. Let's see how.

Run:

```
git checkout master
git pull # make sure your master branch is update to date
git checkout 1.x
git rebase master
```

##### Resolving conflicts

**File:** `manifest.json` 

Keep the version from branch `1.x`, example: between `0.3.4` and `1.2.1`, keep `1.2.1`. That will help when bumping a new version.

**File:** `CHANGELOG.md`

Keep both changes on the first and second commit. Add some missing line breaks where needed.

##### Rewriting commits

Run

```
git rebase -i HEAD~2
```

Fixup the lastest commit with the upgrade commit. This will merge the release commit with the upgrade commit into one.

**Sanity check**: Make sure you have only one commit ahead of master.

#### Updating the changelog

Add to the Unreleased section, something like:

```md
### Changed
- Get changes made at version `v0.3.0`.
```

And run:

```
git add .
git commit --amend --no-edit
```

This will merge this changelog changes to the upgrade commit.

#### Release

First, since we are doing a rebase here, force push the branch to remote.

```
git push origin 1.x -f
```

Then, use releasy as usual to release a new patch and push it again.

