

## Fix White Page on GitHub Pages

### Code Change

**`vite.config.ts`** -- Add the `base` property so all asset paths resolve correctly at `https://<username>.github.io/fire-safety-spotter/`:

```ts
base: mode === "production" ? "/fire-safety-spotter/" : "/"
```

### What You Do on GitHub (after this change is pushed)

1. Go to your repository **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**, select **"GitHub Actions"** from the dropdown
4. The existing workflow file (`.github/workflows/deploy.yml`) will handle builds and deployment automatically on every push to `main`

Your site will then be live at:
`https://<your-username>.github.io/fire-safety-spotter/`

