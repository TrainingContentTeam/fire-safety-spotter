

## Fix GitHub Actions Build Failure

The `npm ci` command requires `package-lock.json` to be perfectly in sync with `package.json`. Yours is out of date. The quickest fix is to change the workflow to use `npm install` instead.

### Code Change

**`.github/workflows/deploy.yml`** -- Replace `npm ci` with `npm install`:

```yaml
- run: npm install
- run: npm run build
```

That single word change will resolve the build failure. The workflow will regenerate the lock file on the fly and proceed with the build.

### Alternative (if you prefer `npm ci` long-term)

Run this locally and push the updated lock file:

```bash
npm install
git add package-lock.json
git commit -m "update lock file"
git push
```

Then the existing `npm ci` would work. But changing to `npm install` in the workflow is simpler and avoids this issue recurring.

