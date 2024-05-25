# UI & UX Training

[![Netlify Status](https://api.netlify.com/api/v1/badges/3123f569-8b7b-44a0-b883-b7ae83a314da/deploy-status)](https://app.netlify.com/sites/chrisvilches-ui-ux/deploys)

A repository that contains several applications made with the purpose of practicing the following:

* UI/UX Design
* Frontend (general skills)
* React.js (and other frameworks)
* CSS

## App List

| Live Demo | Description |
|--|--|
| [<img src="https://github.com/ChrisVilches/UI-UX/blob/main/screenshots/anim-3d.jpg?raw=true" width=250>](https://ui-ux.chrisvilches.com/anim-3d) | <h3>anim-3d ([Live Demo](https://ui-ux.chrisvilches.com/anim-3d))</h3>Small app made with Three.js and React. |
| [<img src="https://github.com/ChrisVilches/UI-UX/blob/main/screenshots/custom-scroll.jpg?raw=true" width=250>](https://ui-ux.chrisvilches.com/custom-scroll) | <h3>custom-scroll ([Live Demo](https://ui-ux.chrisvilches.com/custom-scroll))</h3>Custom scrollbar inspired by audio/video editing software (specifically Ableton), as well as VSCode. Content is a grid (tabular data). |
| [<img src="https://github.com/ChrisVilches/UI-UX/blob/main/screenshots/hexagon.jpg?raw=true" width=250>](https://ui-ux.chrisvilches.com/hexagon) | <h3>hexagon ([Live Demo](https://ui-ux.chrisvilches.com/hexagon))</h3>Responsive hexagonal grid design. |
| [<img src="https://github.com/ChrisVilches/UI-UX/blob/main/screenshots/signal.jpg?raw=true" width=250>](https://ui-ux.chrisvilches.com/signal) | <h3>signal ([Live Demo](https://ui-ux.chrisvilches.com/signal))</h3>A React demo app to demonstrate the signals feature. |
| [<img src="https://github.com/ChrisVilches/UI-UX/blob/main/screenshots/sticky.jpg?raw=true" width=250>](https://ui-ux.chrisvilches.com/sticky) | <h3>sticky ([Live Demo](https://ui-ux.chrisvilches.com/sticky))</h3>Layout with sticky elements (desktop only). |

## Deployment

First set environment variables:

```sh
export BASE_URL=http://localhost:3000/
```

Build all apps:

```sh
npm run build
```

Take screenshots. First make sure apps are running in the specified base url:

```sh
npm run gen-screenshots
```

Generate readme:

```sh
npm run gen-readme
```
