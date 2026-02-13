

## Fix Image Size and Show Navigation Tabs within 1920x800

The image is currently set to fill the full width (`w-full h-auto`), which makes it taller than the available space inside the 800px container. This pushes the bottom navigation bar out of view.

### Changes

**`src/components/InteractiveScene.tsx`**
- Change the image from `w-full h-auto` to `w-full h-full object-contain` so it scales down to fit the available vertical space
- Add `h-full` to the container wrapper so it respects the space given by the parent

**`src/components/SpotTheHazard.tsx`**
- Change the scene wrapper from `flex-1` to `flex-1 min-h-0` -- this is the key fix. Without `min-h-0`, flex children with intrinsic content (the image) won't shrink below their natural size. Adding `min-h-0` allows the image area to shrink so the navigation bar stays visible.

### Result
- Header, progress bar, part header all remain at the top
- The image scales down to fit the remaining space
- The navigation bar (Back / Next buttons and dot indicators) is always visible at the bottom
- Hotspot positions remain accurate since they use percentages relative to the image container
