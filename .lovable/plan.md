

## Delay Completion Until Last Hotspot Popup Is Dismissed

**Problem**: When the user clicks the final hotspot, the completion overlay fires immediately via `useEffect`, covering the popup before the user can read it.

**Solution**: Add a delay before triggering the completion overlay. Instead of firing completion as soon as `allComplete` becomes true, wait 3 seconds so the user has time to read the last hotspot's info popup.

### Changes

**`src/components/SpotTheHazard.tsx`**
- Replace the instant `useEffect` completion trigger with a `setTimeout` of ~3 seconds
- Store the timeout ID so it can be cleaned up on unmount or restart
- The `postMessage` to the LMS still fires immediately (so completion is recorded), but the overlay appears after the delay

```tsx
useEffect(() => {
  if (allComplete && !completionSentRef.current) {
    completionSentRef.current = true;
    try {
      window.parent.postMessage({ type: "complete" }, "*");
    } catch {}
    // Delay the overlay so the user can read the last hotspot
    const timer = setTimeout(() => setShowComplete(true), 3000);
    return () => clearTimeout(timer);
  }
}, [allComplete]);
```

- Add `const [showComplete, setShowComplete] = useState(false)` state
- Change the completion overlay condition from `allComplete` to `showComplete`
- Reset `showComplete` to `false` in `handleRestart`

